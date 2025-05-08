import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getVeterinarians } from '../api/api';
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap-icons/font/bootstrap-icons.css"; 
import '../App.css'; 


interface IVet {
  _id: string; 
  name: string; 
  specialties: string[]; 
}

interface IVetsPageState {
  vets: IVet[];
  isLoading: boolean;
  error: string | null;
}

export default class VeterinarianList extends Component<{}, IVetsPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      vets: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    getVeterinarians()
      .then(vets => {
        this.setState({ vets, isLoading: false });
      })
      .catch(error => {
        console.error('Error fetching vets:', error);
        this.setState({ error: 'Failed to load veterinarians', isLoading: false });
      });
  }

  render() {
    const { vets, isLoading, error } = this.state;

    if (isLoading) {
      return <h2>Loading Veterinarians...</h2>;
    }

    if (error) {
      return <h2>{error}</h2>;
    }

    return (
      <div>
        <h3 style={{ marginBottom: "15px" }}><strong>Veterinarians</strong></h3>
        <table className="table table-striped"> 
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialties</th>
            </tr>
          </thead>
          <tbody>
            {vets.map((vet) => (
              <tr key={vet._id}>
                <td>
                  <Link to={`/veterinarians/${vet._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {vet.name}
                  </Link>
                </td>
                <td>
                  {vet.specialties.length > 0
                    ? vet.specialties.join(', ') 
                    : 'none'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
