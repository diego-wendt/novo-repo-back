import { timeout } from "cron";

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(min + Math.random() * (max - min));
};

export const temperatura = (): number => {
  const tempo = new Date();
  const hora = tempo.getHours();
  const minutos = tempo.getMinutes();
  const amplitude = 5;
  const variacao = 0.6;
  const elevation = 25;
  return Math.floor(
    Math.sin(((minutos / 60 + hora -6) / 12) * Math.PI) * amplitude +
      Math.random() * variacao +
      elevation,
  );
};

export const umidade = (): number => {
  const tempo = new Date();
  const hora = tempo.getHours();
  const minutos = tempo.getMinutes();
  const amplitude = 15;
  const variacao = 3;
  const elevation = 60;
  return Math.floor(
    Math.sin(((minutos / 60 + hora - 19) / 12) * Math.PI) * amplitude +
      Math.random() * variacao +
      elevation,
  );
};

export const precipitacao = (): number => {
  let chuva = 0;
  const chance = Math.random();
  if (chance > 0.90) {
    chuva = Math.random() * 10;
  }
  return Math.floor(chuva);
};

export const intensidadeLuminosa = (): number => {
  let luz;
  const tempo = new Date();
  const hora = tempo.getHours();
  const minutos = tempo.getMinutes();
  const periodo = 7;
  const avanco = 8;
  const amplitude = 30;
  const variacao = 1;
  const elevation = 30;
  if (hora >= 6 && hora <= 19) {
    luz = Math.floor(
      Math.sin(((minutos / 60 + hora - avanco) / periodo) * Math.PI) *
        amplitude +
        Math.random() * variacao +
        elevation,
    );
  } else {
    luz = 0;
  }
  return luz;
};

export const vento = () => {
  const periodo = 12;
  const avanco = Math.random() * 6;
  const amplitude = 1;
  const variacao = Math.random() * 15;
  const elevation = 1;
  return Math.floor(
    Math.sin((avanco / periodo) * Math.PI) * amplitude +
      Math.random() * variacao +
      elevation,
  );
};

