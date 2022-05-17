import { useState, useEffect } from 'react';

import Header from '../../components/Header';
import {api} from '../../services/api';
import { Food } from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import {FoodTypes} from './Food.types';

export default function Dashboard() {
  const [foods,setFoods] = useState<FoodTypes[]>([]);
  const [modalOpen,setModalOpen] = useState(false);
  const [editModalOpen,setEditModalOpen] = useState(false);
  const [editinFood, setEditingFood] = useState<any>();
 
  const loadFoods = async () => {
    const response = await api.get('/foods');
    setFoods(response.data);
}
  useEffect(() => {
  
  loadFoods();

  },[]);



  async function handleAddFood(food:FoodTypes) {
    try {
      
      
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food:FoodTypes) {
    

    try {
      const foodUpdated = await api.put(
        `/foods/${editinFood.id}`,
        { ...editinFood,...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id:Number) {
    

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

   setFoods(foodsFiltered);
  }

  const toggleModal = () => (setModalOpen(!modalOpen));

  const toggleEditModal = () => (setEditModalOpen(!editModalOpen));
  

  function handleEditFood(food:FoodTypes) {    
   setEditingFood(food);
   setEditModalOpen(true);
  }

 
    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          requestClose={toggleEditModal}
          editingFood={editinFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={String(food.id)}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
  
};

