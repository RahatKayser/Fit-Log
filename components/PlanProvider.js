"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

const PlanContext = createContext();

const emptyArray = [];

function createStore(key) {
  let value = emptyArray;
  const listeners = new Set();

  return {
    getSnapshot() {
      return value;
    },

    getServerSnapshot() {
      return emptyArray;
    },

    subscribe(callback) {
      listeners.add(callback);

      return () => {
        listeners.delete(callback);
      };
    },

    load() {
      const storedData = localStorage.getItem(key);

      value = storedData ? JSON.parse(storedData) : emptyArray;

      listeners.forEach((listener) => listener());
    },

    setData(data) {
      value = data;

      localStorage.setItem(key, JSON.stringify(data));

      listeners.forEach((listener) => listener());
    },
  };
}

const planStore = createStore("fitlog-plan");
const savedStore = createStore("fitlog-saved");

export function PlanProvider({ children }) {
  const plan = useSyncExternalStore(
    planStore.subscribe,
    planStore.getSnapshot,
    planStore.getServerSnapshot
  );

  const saved = useSyncExternalStore(
    savedStore.subscribe,
    savedStore.getSnapshot,
    savedStore.getServerSnapshot
  );

  useEffect(() => {
    planStore.load();
    savedStore.load();
  }, []);

  const addToPlan = (workout) => {
    if (plan.length >= 5) {
      return {
        success: false,
        message: "Today's plan is full.",
      };
    }

    if (plan.some((item) => item.id === workout.id)) {
      return {
        success: false,
        message: "Workout is already in today's plan.",
      };
    }

    planStore.setData([...plan, workout]);

    return {
      success: true,
      message: "Workout added to today's plan.",
    };
  };

  const saveWorkout = (workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      return {
        success: false,
        message: "Workout is already saved.",
      };
    }

    savedStore.setData([...saved, workout]);

    return {
      success: true,
      message: "Workout saved for later.",
    };
  };

  const removeFromPlan = (id) => {
    planStore.setData(plan.filter((item) => item.id !== id));
  };

  const removeFromSaved = (id) => {
    savedStore.setData(saved.filter((item) => item.id !== id));
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}