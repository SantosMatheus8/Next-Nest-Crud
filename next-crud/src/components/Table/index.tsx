// Table.tsx

import { useState } from "react";
import { IconClose } from "../Icons/IconClose";
import ProductModal from "../ProductModal";
import { getProducts, updateProduct } from "@/services/productService";

export type TableProps = {
  id:number,
  name: string;
  category: string;
  price: number;
};

type Props = {
  rows: TableProps[];
  onDelete: (id: number) => void; // Adicione a prop onDelete aqui
};

export const Table = ({ rows, onDelete }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState(0);

  const openModal = (rowId: number) => {
    setProductId(rowId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (product: any) => {
console.log('--------------------', productId)
    await updateProduct(String(productId),{ name: product.name, category : product.category, price : product.price });
      closeModal();
    } 
  return (
    <section className="w-full">
      <ul className="flex bg-slate-700 p-1">
        <li className="text-white w-1/4">Nome</li>
        <li className="text-white w-1/4">Categoria</li>
        <li className="text-white w-1/4">Preço</li>
        <li className="text-white w-1/4"></li>
      </ul>

      {rows.map((row, index) => (
        <div className="flex bg-slate-100 border-b-2 border-slate-400 p-1" key={index}>
          <span className="w-1/4">{row.name}</span>
          <span className="w-1/4">{row.category}</span>
          <span className="w-1/4">{row.price}</span>
          <div className="flex w-1/4 items-center gap-2">
            <button onClick={() => openModal(row.id)}>Editar</button>
            <button onClick={() => onDelete(row.id)}> 
              <IconClose />
            </button>
          </div>
        </div>
      ))}
          <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        title="Editar Produto"
      />
    </section>
  );
};
