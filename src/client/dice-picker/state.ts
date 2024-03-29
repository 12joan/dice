import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TDiceRollRequestPart, TDie } from '~/core/types';

export type TDicePickerState = {
  isFirstPage: boolean;
  diceRollRequestParts: TDiceRollRequestPart[];
  composingDie: TDie | null;
  label: string;
};

const initialState: TDicePickerState = {
  isFirstPage: true,
  diceRollRequestParts: [],
  composingDie: null,
  label: '',
};

export const useDicePickerState = () => {
  const { state } = useLocation();
  return (state ?? initialState) as TDicePickerState;
};

export type TTo = number | string;

export type TNavigateOptions = {
  transformState?: (state: TDicePickerState) => TDicePickerState;
  replace?: boolean;
};

export const useNavigateWithState = () => {
  const navigate = useNavigate();
  const state = useDicePickerState();

  return useCallback(
    (
      to: TTo | number,
      { transformState = (state) => state, replace }: TNavigateOptions = {}
    ) => {
      if (typeof to === 'number') {
        navigate(to);
      } else {
        navigate(to, {
          state: {
            ...transformState(state),
            isFirstPage: false,
          },
          replace,
        });
      }
    },
    [navigate, state]
  );
};
