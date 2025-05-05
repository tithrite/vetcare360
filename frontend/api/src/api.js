import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getVeterinarians = async () => {
  try {
    const response = await api.get('/veterinarians');
    return response.data;
  } catch (error) {
    console.error('Error fetching veterinarians:', error);
    throw error;
  }
}

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

export const getOwnerByLastName = async (lastName) => {
  try {
    const response = await api.get(`/owners/search/${lastName}`);
    return response.data;
  } catch (error) {
    console.error('Error searching for owner by last name:', error);
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

export const getOwners = async () => {
  try {
    const response = await api.get('/owners');
    return response.data;
  } catch (error) {
    console.error('Error fetching owners:', error);
    throw error;
  }
};

export const createPet = async (ownerId, petData) => {
  try {
    const response = await api.post(`/owners/${ownerId}/pets`, petData);
    return response.data;
  } catch (error) {
    console.error('Error creating pet:', error);
    throw error;
  }
};

export default {
  getVeterinarians,
  createOwner,
  updateOwner,
  getOwnerByLastName,
  getOwnerById,
  getOwners,
  createPet
};
