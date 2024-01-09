import { Dispatch, SetStateAction } from "react";

export type BlindsModel = 'slow' | 'classic' | 'turbo';

export interface Blinds {
    small: number,
    big: number
};

export interface blindsStrategyType {
    classic: (small: number, big: number) => Blinds,
    slow: (small: number, big: number) => Blinds,
    custom: () => []
};

export interface blindsType {
    small: number,
    big: number,
};

export interface TimerProps {
    minutes: number;
    currentBlindsModel: BlindsModel
    ante: number;
    blinds: blindsType;
    round: number;
    nextBlinds: blindsType;
    setRound: () => void;
    setBlinds: () => void;
    setIsRed: Dispatch<SetStateAction<boolean>>;
};

export interface SettingsProps {
    minutes: number;
    handleMinutesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAnteChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setCurrentBlindsModel: (model: any) => void;
    setMinutes: React.Dispatch<React.SetStateAction<number>>;
    currentBlindsModel: BlindsModel
};

export interface BlinsProps {
    setCurrentBlindsModel: (model: any) => void;
    currentBlindsModel: BlindsModel
};

export interface NavigationProps {
    changeTab: (id: string) => void;
};

export type Tabs = 'timer' | 'settings' | 'history' | any;

export interface ContinueGameProps {
    setContinueGame: (continueG: boolean) => void;
    showModal: boolean;
};

export interface ContainerProps {
    currentGame: {[key: string]: any}
    saveGame: (game: any) => void;
    games: [{[key: string]: any}]
}

export interface HistoryProps {
    games: [{[key: string]: any}]
}