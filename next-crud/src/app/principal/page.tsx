'use client';

import { Button } from "@/components/Button";
import ProductModal from "@/components/ProductModal";
import { Table, TableProps } from "@/components/Table";
import { createProduct, deleteProduct, getProducts } from "@/services/productService";
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';


export default function PrincipalPage() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };



  const loadProducts = async () => {
    try {
      const response = await getProducts();
      const productsData = response.data; 

      setProducts(productsData);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProducts([]); 
    }
  };
  
  useEffect(() => {
    loadProducts();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (product: any) => {

      const response = await createProduct({ name: product.name, category : product.category, price : product.price });
  
      if (response.status === 201) {
        loadProducts();
        closeModal();
      } }

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteProduct(id);
      if (response.status === 200) {
        loadProducts(); 
      } else {
        console.error('Erro ao excluir o produto:', response.data);
      }
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
    }
  };
 

  return (
<section className="mx-auto max-w-[75%] flex flex-col items-center">
<h1 className="mt-5 mb-20 text-3xl">Gerenciamento de Produtos</h1>

<Button onClick={openModal}>Novo Produto</Button>
      <section className="mb-10">
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        title="Cadastrar Novo Produto"
      />
   
      </section>

<Table rows={products} onDelete={handleDelete}/> 

    </section>
    )
  }
  
  
    