import React, { useEffect, useState } from 'react';
import { TableProps } from '../Table';
import Modal from 'react-modal';
import { Button } from '../Button';


type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Partial<TableProps>) => void;
  title: string;
  product?:TableProps;
};

export default function ProductModal({ isOpen, onClose, onSubmit,title,product }:ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
  });

  useEffect(() => {
    console.log('jhkhjkhkjhjkkhjhjkhjkhjkhjkhjk', product)

    if (product){
    setFormData(product);} 
  }, [isOpen]);
  

  const handleChange = (e:any) => { 
    console.log('jhkhjkhkjhjkkhjhjkhjkhjkhjkhjk', product)

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleResetForm = () => {
    setFormData({ name: '',
    category: '',
    price: 0,});
  };

  const handleClose = () => {
    onClose();
    handleResetForm();
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(formData)
    onSubmit(formData);
    handleResetForm();
  };

  return (

    <Modal isOpen={isOpen} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"  >
      <div className="modal-content bg-[rgb(252,252,252)] p-4 rounded-md w-[400px]">
        <h2 className='text-lg mb-8 font-bold'>{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex gap-4 flex-col mb-8'>
            <input className='bg-white rounded-lg	border-2 border-shades-04-40% font-normal	text-[0.875rem] px-2 py-3' type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Nome' />
            <input className='bg-white rounded-lg	border-2 border-shades-04-40% font-normal	text-[0.875rem] px-2 py-3' type="text" name="category" value={formData.category} onChange={handleChange} placeholder='Categoria' />
            <input className='bg-white rounded-lg	border-2 border-shades-04-40% font-normal	text-[0.875rem] px-2 py-3' type="text" name="price" value={formData.price} onChange={handleChange} placeholder='Preço' />
          </div>
          <div className='flex gap-4 justify-center'>
            <Button fullWidth  type="submit">Enviar</Button>
            <Button fullWidth onClick={handleClose} variant='outlined'>Fechar</Button>
          </div>
        </form>
      </div>
    </Modal>   
  );
}
