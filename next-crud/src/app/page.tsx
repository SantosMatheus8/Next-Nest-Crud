'use client';
import { Button } from "@/components/Button";
import ProductModal from "@/components/ProductModal";
import { Table } from "@/components/Table";
import { createProduct, deleteProduct, getProducts } from "@/services/productService";
import React, { useState, useEffect } from 'react';

export default function PrincipalPage() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const loadProducts = async () => {
      const response = await getProducts();
      const productsData = response.data; 

      setProducts(productsData);
  };
  
  useEffect(() => {
    loadProducts();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (product: any) => {
    await createProduct({ name: product.name, category : product.category, price : product.price });
    loadProducts();
    closeModal();
  } 

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    loadProducts(); 
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

      <Table rows={products} onDelete={handleDelete} setProducts={setProducts}/> 
    </section>
    )
}
  
  
    