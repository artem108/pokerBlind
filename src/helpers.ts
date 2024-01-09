import { Blinds }  from "./interfaces";

const pad = (value: number): string => value < 10 ? `0${value}` : `${value}`;

export const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = pad(minutes);
    const formattedSeconds = pad(seconds);

    return `${formattedMinutes}:${formattedSeconds}`;
}


export const classicBlindsFormula = (small: number, big: number): Blinds => {
    return {
        small: big,
        big: big * 2,
    }
};

export const slowBlindsFormula = (small: number, big: number): Blinds => {
    const newSmallBlind = small + 5;

    if (newSmallBlind > 50) {
        return {
            small: big,
            big: big * 2,
        };
    } else {
        return {
            small: newSmallBlind,
            big: newSmallBlind * 2,
        };
    }
};

export const turboBlindsFormula = (small: number, big: number): Blinds => {
    if (small === 5) {
        return {
            small: 25,
            big: 50,
        };
    }
    if (small === 25) {
        return {
            small: 100,
            big: 200,
        }; 
    }

    return {...classicBlindsFormula(small, big)};
};

export const startBlinds = {
    small: 5,
    big: 10,
};

export const getClassicBlinds = (): Blinds[] => {
    const res = [startBlinds];
    let count = 28;

    while (count > 0) {
        res.push(classicBlindsFormula(res[res.length -1].small, res[res.length -1].big));
        count--;
    }

    return res;
};

export const getSlowBlinds = (): Blinds[] => {
    const res = [startBlinds];
    let count = 28;

    while (count > 0) {
        res.push(slowBlindsFormula(res[res.length -1].small, res[res.length -1].big));
        count--;
    }

    return res;
}

export const getTurboBlindsExample = (): Blinds[] => {
    const res = [startBlinds];
    let count = 28;

    while (count > 0) {
        res.push(turboBlindsFormula(res[res.length -1].small, res[res.length -1].big));
        count--;
    }

    return res;
};

export const blindsModelNames: string[] = ['slow', 'classic', 'turbo'];

export const blindsStrategy = {
    classic: classicBlindsFormula,
    slow: slowBlindsFormula,
    turbo: turboBlindsFormula
  };

  export const blindsStrategyExample = {
    classic: getClassicBlinds,
    slow: getSlowBlinds,
    turbo: getTurboBlindsExample
  };

  export const anteStrategy = {
    classic: 10,
    slow: 20,
    turbo: 1
  };