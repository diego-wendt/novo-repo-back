import { CompaniesEntity } from "src/companies/entity/company.entity";

export const modelo_email_registro_realizado = (company: CompaniesEntity) => {
  const URL_LOGIN = `${process.env.URL_FRONTEND}`;
  return `
      <html>
      <body>
      <br>
      <p align="center">
      <img src="https://i.postimg.cc/T3Z0ws6s/logo.jpg" alt="Descrição da imagem" width="300px">
      </p>
      <br>
      <h1>Parabéns. Seu e-mail foi confirmado e seu cadastro foi finalizado com sucesso.</h1>
      <br>
      <h3>Olá ${company.name} - ${company.owner},</h3>
      <p>Seu endereço de e-mail foi confirmado na plataforma de serviços Farm Metrics.</p>
      
      <p>A partir de agora você ja pode utilizar a nossa tecnologia para monitorar os seus dispositivos e extrair o máximo que a tecnologia tem a lhe oferecer.</p>
      <p>Conte conosco para que seu projeto se desenvolva e continue cultivando Conexões.</p>
      <br>
      <a href="${URL_LOGIN}" target:"_top">SmartFarm</a>
      <br>
      <h2 align="center">Farm Metrics</h2>
      <h3 align="center">Cultivando conexões</h3>
      </body>
      </html>`;
};
