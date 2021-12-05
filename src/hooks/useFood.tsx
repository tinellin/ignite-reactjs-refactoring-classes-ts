import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '../services/api';

export type Food = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

type FoodProviderProps = {
  children: ReactNode;
};

type FoodContextData = {
  foods: Food[];
  setFoods: (foods: Food[]) => void;
  editingFood: Food | undefined;
  setEditingFood: (food: Food) => void;
  handleAddFood: (food: Food) => Promise<void>;
  handleUpdateFood: (food: Food) => Promise<void>;
  handleDeleteFood: (id: number) => Promise<void>;
};

const FoodContext = createContext<FoodContextData>({} as FoodContextData);

export function FoodProvider({ children }: FoodProviderProps) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [editingFood, setEditingFood] = useState<Food>();

  useEffect(() => {
    async function getFoods() {
      const { data } = await api.get('/foods');

      setFoods(data);
    }

    getFoods();
  }, []);

  async function handleAddFood(food: Food) {
    try {
      const { data } = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods((foods) => [...foods, data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: Food) {
    try {
      const { data: foodUpdated } = await api.put<Food>(
        `/foods/${editingFood?.id}`,
        {
          ...editingFood,
          ...food,
        }
      );

      const foodsUpdated = foods.map((f) => {
        return f.id !== foodUpdated.id ? f : foodUpdated;
      });

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);

    setFoods(foodsFiltered);
  }

  return (
    <FoodContext.Provider
      value={{
        foods,
        setFoods,
        editingFood,
        setEditingFood,
        handleAddFood,
        handleUpdateFood,
        handleDeleteFood,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}

export function useFood() {
  const context = useContext(FoodContext);

  return context;
}
