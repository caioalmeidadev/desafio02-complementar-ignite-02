import { useEffect,useState,useRef, FormEvent } from 'react';
import { FiCheckSquare,FiImage,FiEdit,FiPlayCircle } from 'react-icons/fi';
import {FoodTypes} from '../../pages/Dashboard/Food.types';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { FormHandles } from '@unform/core';

interface EditModalProps {
  isOpen:boolean;
  handleUpdateFood: (food:FoodTypes) => void;
  editingFood: FoodTypes;
  requestClose: () => void;
}

export default function ModalEditFood({isOpen, handleUpdateFood,editingFood,requestClose}:EditModalProps){
  
  const formRef = useRef<FormHandles>(null);
  
  
  async function handleSubmit(data:FoodTypes) {
    

    handleUpdateFood(data);
    requestClose();
  };

    return (
      <Modal isOpen={isOpen} requestClose={requestClose}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input icon={FiImage} name="image" placeholder="Cole o link aqui" />

          <Input icon={FiEdit} name="name" placeholder="Ex: Moda Italiana" />
          <Input icon={FiPlayCircle} name="price" placeholder="Ex: 19.90" />

          <Input icon={FiEdit} name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  }

