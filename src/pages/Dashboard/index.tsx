import { useState } from 'react';

import { FoodsContainer } from './styles';

import { Header } from '../../components/Header';
import { FoodCart } from '../../components/FoodCart';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

import { useFood } from '../../hooks/useFood';

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { setEditingFood, foods } = useFood();

  function handleEditFood(food: any) {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  console.log(foods);

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood isOpen={modalOpen} setIsOpen={toggleModal} />
      <ModalEditFood isOpen={editModalOpen} setIsOpen={toggleEditModal} />
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <FoodCart
              key={food.id}
              food={food}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
