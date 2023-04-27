import { CompaniesEntity } from "src/companies/entity/company.entity";

export const modelo_email_confirmar_email = (
  company: CompaniesEntity,
  token: string,
) => {
  const URL_LOGIN = `${process.env.URL_BACKEND}/auth/confirma-email/?token=${token}&mail=${company.mail}`;
  return `
      <html>
      <body>
      <br>
      <p align="center">
      <img src="https://i.postimg.cc/T3Z0ws6s/logo.jpg" alt="Descrição da imagem" width="300px">
      </p>
      <br>
      <h1>Conclua a criação de sua conta.</h1>
      <br>
      <h3>Olá ${company.name},</h3>
      <p>Seu endereço de e-mail foi registrado na Farm Metrics.</p>
      <a href="${URL_LOGIN}" target:"_blank">Confirmar meu endereço de e-mail</a>
      
      <p>Se você não associou seu endereço de e-mail com sua conta SmartFarm, ignore esta mensagem e não clique no link acima.</p>
      <p>Caso tenha algum problema com o botão acima, copie e cole a URL abaixo em seu navegador de internet.</p>
      <br>
      <h2 align="center">Farm Metrics</h2>
      <h3 align="center">Cultivando conexões</h3>
      </body>
      </html>`;
};
