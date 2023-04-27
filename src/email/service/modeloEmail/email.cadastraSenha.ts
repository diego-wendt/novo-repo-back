export const modelo_email_cadastrar_senha = (retorno) => {
  const URL_LOGIN = process.env.URL_BACKEND;
  return `
    <html>
    <body>
    <br>
    <p align="center">
    <img src="https://i.postimg.cc/T3Z0ws6s/logo.jpg" alt="Descrição da imagem" width="300px">
    </p>
    <br>
    <h2>Olá ${retorno.company.name},</h2>
    <br>
    <p>Conforme solicitado, segue sua senha para o sistema Farm Metrics:</p>
    <p>  <b>${retorno.newPassword}</b>   </p>
    <p>Esta senha é válida até o dia ${retorno.tempTokenExpireDate} .</p>
    <p>Para acessar a SmartFarm, click no link <a href="${URL_LOGIN}" target:"_top">Clique aqui para enviar</a> e</p>
    <p>use a senha deste email para realizar o login.</p>
    <p>Após acessar o endereço, atualize a sua senha.</p>
    <p>Caso não tenha solicitado, ignore este email.</p>
    <br>
    <h2 align="center">Farm Metrics</h2>
    <h3 align="center">Cultivando conexões</h3>
    </body>
    </html>`;
};
