import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getOwners = async () => {
  try {
    const response = await api.get('/owners');
    return response.data;
  } catch (error) {
    console.error('Error fetching owners:', error);
    throw error;
  }
};

export const getOwnerById = async (ownerId) => {
  try {
    const response = await api.get(`/owners/${ownerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching owner by ID:', error);
    throw error;
  }
};

export const getOwnerByLastName = async (lastName) => {
  try {
    const response = await api.get(`/owners/search/${lastName}`);
    return response.data;
  } catch (error) {
    console.error('Error searching for owner by last name:', error);
    throw error;
  }
};

export const createOwner = async (ownerData) => {
  try {
    const response = await api.post('/owners', ownerData);
    return response.data;
  } catch (error) {
    console.error('Error creating owner:', error);
    throw error;
  }
};

export const updateOwner = async (ownerId, ownerData) => {
  try {
    const response = await api.put(`/owners/${ownerId}`, ownerData);
    return response.data;
  } catch (error) {
    console.error('Error updating owner:', error);
    throw error;
  }
};

export const getVeterinarians = async () => {
  try {
    const response = await api.get('/veterinarians');
    return response.data;
  } catch (error) {
    console.error('Error fetching veterinarians:', error);
    throw error;
  }
};

export const createPet = async (petData) => {
  try {
    const response = await api.post('/pets', petData);
    return response.data;
  } catch (error) {
    console.error('Error creating pet:', error);
    throw error;
  }
};

export const getPetById = async (petId) => {
  try {
    const response = await api.get(`/pets/${petId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pet:', error);
    throw error;
  }
};

export const updatePet = async (petId, petData) => {
  try {
    const response = await api.put(`/pets/${petId}`, petData);
    return response.data;
  } catch (error) {
    console.error('Error updating pet:', error);
    throw error;
  }
};

export const getPetTypes = async () => {
  try {
    const response = await api.get('/pets/types');
    return response.data;
  } catch (error) {
    console.error('Error fetching pet types:', error);
    throw error;
  }
};

export const createVisit = async (visitData) => {
  try {
    const response = await api.post('/visits', visitData);
    return response.data;
  } catch (error) {
    console.error('Error creating visit:', error);
    throw error;
  }
};

export const getVisitsForPet = async (petId) => {
  try {
    const response = await api.get(`/pets/${petId}/visits`);
    return response.data;
  } catch (error) {
    console.error('Error fetching visits for pet:', error);
    throw error;
  }
};

export default {
  getOwners,
  getOwnerById,
  getOwnerByLastName,
  createOwner,
  getPetById,
  updateOwner,
  getVeterinarians,
  createPet,
  updatePet,
  getPetTypes,
  createVisit,
  getVisitsForPet
};
