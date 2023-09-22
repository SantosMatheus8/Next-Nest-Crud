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
  onDelete: (id: number) => void; 
  setProducts:any;
};

export const Table = ({ rows, onDelete, setProducts}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState({} as TableProps);

  const openModal = (row: TableProps) => {
    setProduct(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (product: any) => {
    await updateProduct(String(product.id),{name : product.name, category : product.category, price : product.price });
    closeModal();
    const response = await getProducts()
    setProducts(response.data);
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
            <button onClick={() => openModal(row)}>Editar</button>
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
        product={product}
        title="Editar Produto"
      />
    </section>
  );
};
