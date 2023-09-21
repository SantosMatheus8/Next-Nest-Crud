
import React, { useState } from 'react';
import { TableProps } from '../Table';
import Modal from 'react-modal';
import { Button } from '../Button';


type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Partial<TableProps>) => void;
  title: string;
};

export default function ProductModal({ isOpen, onClose, onSubmit,title }:ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleResetForm = () => {
    setFormData({ name: '',
    category: '',
    price: 0,});
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(formData)
    onSubmit(formData);
  };

  return (

<Modal isOpen={isOpen} className="fixed inset-0 flex items-center justify-center">
      <div className="modal-content bg-[rgb(252,252,252)] p-4 rounded-md">
        <h2 className='text-lg mb-4 font-bold'>{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex gap-4 flex-col mb-4'>
            <input className='bg-white rounded-lg	border-2 border-shades-04-40% font-normal	text-[0.875rem] p-1' type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Nome' />
            <input className='bg-white rounded-lg	border-2 border-shades-04-40% font-normal	text-[0.875rem] p-1' type="text" name="category" value={formData.category} onChange={handleChange} placeholder='Categoria' />
            <input className='bg-white rounded-lg	border-2 border-shades-04-40% font-normal	text-[0.875rem] p-1' type="text" name="price" value={formData.price} onChange={handleChange} placeholder='Preço' />
          </div>
          <div className='flex gap-4 justify-center'>
          <Button type="submit">Enviar</Button>
        <Button onClick={onClose} variant='outlined'>Fechar</Button>
          </div>
        </form>
      </div>
      </Modal>
    
  );
}



// <section className="mb-10">
// <form onSubmit={handleSubmit}>
//   <input type="text" name="name" placeholder="Nome do produto" className="w-1/2 mb-5" />
//   <input type="text" name="category" placeholder="Categoria" className="w-1/2 mb-5" />
//   <input type="text" name="price" placeholder="Preço" className="w-1/2 mb-5" />
//   <Button type="submit" fullWidth>
//     Cadastrar Produto
//   </Button>
// </form>