import React, { useState } from 'react';
'use cliente';
const RepentanceForm = () => {
  const [formData, setFormData] = useState({
    referenceNumber: '',
    firstLastName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    note: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            NUMERO DE REFERENCIA
            <input
              type="text"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={handleChange}
              placeholder="como figura en el recibo"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Nombre y apellido
            <input
              type="text"
              name="firstLastName"
              value={formData.firstLastName}
              onChange={handleChange}
              placeholder="como figura en el recibo"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="el mismo email que colocaste en el formulario"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Numero de Telefono
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="telefono"
              required
            />
          </label>
        </div>
        <div>
          <label>
            NOTA OPCIONAL
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Añade una nota mencionando el motivo del reembolso"
            />
          </label>
        </div>
        <div>
          <button>Buscar transferecnia</button>
          <button>Salir</button>
        </div>
      </form>
    </div>
  );
};

export default RepentanceForm;
