/** 
 * Este codigo gerencia as operações 
 * relacionadas às solicitações de aluguel, 
 * garantindo que os dados sejam válidos e 
 * atualizando o status conforme necessário.
*/
// A biblioteca uuid é utilizada para gerar os ids das informações criadas
const { v4: uuidv4 } = require('uuid');

const connection = require('../service/rentalRequest');
const vehicleConnection = require('../service/vehicle');
const userConnection = require('../service/user');


async function createRentalRequest(req, res, next) {
  console.log('creating rental request...');

  try {
    const salt_rounds = 10;
    const data = req.body;
    data.id = uuidv4();
    console.log(data);
    
    if (
      !data.vehicle_id || 
      !data.lessee_id || 
      !data.lessor_id || 
      !data.rental_start || 
      !data.rental_end
    ) {
      const error = new Error('Bad User Input');
      error.status = 400;
      next(error);
      return;
    }



    // VEHICLE CHECKING
    const { data: vehicles } = await vehicleConnection.findVehicleById(data.vehicle_id);
    const vehicle = vehicles ? vehicles[0] : null;
    console.log('vehicle', vehicle);
    
    if (!vehicle) {
      const error = new Error('Vehicle does not exists');
      error.status = 400;
      next(error);
      return;
    }
    if (!vehicle.available) {
      const error = new Error('Vehicle is not available');
      error.status = 400;
      next(error);
      return;
    }
    data.vehicle = vehicle.name;



    // LESSOR CHECKING
    const { data: lessors } = await userConnection.findUserById(data.lessor_id);
    const lessor = lessors ? lessors[0] : null;
    console.log('lessor', lessor);
    
    if (!lessor) {
      const error = new Error('Lessor does not exist');
      error.status = 400;
      next(error);
      return;
    }
    if (lessor.type !== 'LESSOR') {
      const error = new Error('User type should be LESSOR');
      error.status = 400;
      next(error);
      return;
    }
    data.lessor_name = lessor.full_name;



    // LESSEE CHECKING
    const { data: lessees } = await userConnection.findUserById(data.lessee_id);
    const lessee = lessees ? lessees[0] : null;
    console.log('lessee', lessee);
    
    if (!lessee) {
      const error = new Error('Lessee does not exist');
      error.status = 400;
      next(error);
      return;
    }
    if (lessee.type !== 'LESSEE') {
      const error = new Error('User type should be LESSEE');
      error.status = 400;
      next(error);
      return;
    }
    data.lessee_name = lessee.full_name;
  


    const result = await connection.createRentalRequest(data);

    if (result.error) {
      const error = new Error(result.error.message);
      error.status = 500;
      next(error);
      return;
    }

    res.status(201).json(result.data[0]);
  } catch (err) {
    const error = new Error(err);
    error.status = 400;
    next(error);
  }
}

async function index(req, res, next) {
  console.log('reading all Rental requests...');    
  try {
    const result = await connection.getRentalRequests();


    
    res.status(200).json(result);
  } catch (err) {
    const error = new Error(err);
    error.status = 500;
    next(error);
  }
};

async function updateRentalRequestStatus(req, res, next) {
  console.log('updating rental request...');
  try {
    const { id } = req.params;
    const newData = req.body;
    
    try {
      const { data: rentalRequests } = await connection.findRentalRequestById(id);
      const rentalRequest = rentalRequests ? rentalRequests[0] : null;

      if (!rentalRequest) {
        const error = new Error('Rental request does not exist');
        error.status = 400;
        next(error);
        return;
      }

      const { data: updatedVehicles } = await vehicleConnection.updateVehicle(rentalRequest.vehicle_id, { available: false });
      const updatedVehicle = updatedVehicles ? updatedVehicles[0] : null;

      const result = await connection.updateRentalRequest(id, newData);

      if (!result.error && updatedVehicle) {
        res.status(200).json(result);
      } else {
        console.log('erro')
      }
    } catch (err) {
      const error = new Error(err);
      error.status = 400;
      next(error);
      return;
    }
  } catch (err) {
    const error = new Error(err);
    error.status = 400;
    next(error);
  }
}

async function deleteRentalRequest(req, res, next) {
  console.log('deleting rental request...');

  try {
    const { id } = req.params;
    const { data: rentalRequests } = await connection.findRentalRequestById(id);
    const rentalRequest = rentalRequests ? rentalRequests[0] : null;
    console.log('rentalRequest', rentalRequest);

    if (!rentalRequest) {
      const error = new Error('Rental request not found');
      error.status = 400;
      next(error);
      return;
    }

    const response = await connection.deleteRentalRequest(id);
    console.log('response', response);

    res.status(200).json(response);
  } catch (err) {
    const error = new Error(err);
    error.status = 400;
    next(error);
  }
}

async function getRentalRequest(req, res, next) {
  console.log('finding rental requests by id...');
  try {
    const { id } = req.params;
    
    const result = await connection.findRentalRequestById(id);
    const rentalRequests = result.data[0];

    res.status(200).json(rentalRequests);
  } catch (err) {
    const error = new Error(err);
    error.status = 400;
    next(error);
  }
}

async function getRentalRequestByUser(req, res, next) {
  console.log('finding rental requests by user id...');
  try {
    const { id } = req.params;
    
    const result = await connection.findRentalRequestByFilters('lessee_id', id);
    const rentalRequests = result.data[0];

    res.status(200).json(rentalRequests);
  } catch (err) {
    const error = new Error(err);
    error.status = 400;
    next(error);
  }
}

module.exports = {
  createRentalRequest,
  index,
  updateRentalRequestStatus,
  deleteRentalRequest,
  getRentalRequest,
  getRentalRequestByUser,
};
