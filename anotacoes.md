<!-- index.html antigo -->
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Site de Leilão</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <h1 class="text-center">Bem-vindo ao Site de Leilão</h1>
      <!-- Exibição da Hora Atual -->
      <p class="text-center mt-3" id="horaAtual">Carregando...</p>

      <p class="text-center">Você precisa estar logado para continuar.</p>
      <!-- Botão para abrir o modal de login -->
      <div class="text-center">
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#loginModal"
        >
          <i class="fas fa-sign-in-alt"></i> Login
        </button>
      </div>
      <p class="text-center mt-3">
        Ainda não tem um cadastro? <a href="cadastro.html">Clique aqui</a> para
        se registrar.
      </p>
    </div>

    <!-- Modal de Login -->
    <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">Login</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="loginForm">
              <div class="form-group">
                <label for="nome_usuario">Nome de Usuário</label>
                <input
                  type="text"
                  class="form-control"
                  id="nome_usuario"
                  required
                />
              </div>
              <div class="form-group">
                <label for="senha">Senha</label>
                <input
                  type="password"
                  class="form-control"
                  id="senha"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
            <div
              id="loginAlert"
              class="alert alert-danger mt-3 d-none"
              role="alert"
            >
              Falha no login.
            </div>
          </div>
        </div>
      </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script>
      $(document).ready(function () {
        // Exibir hora atual (apenas hora e minuto)
        $.get("http://worldtimeapi.org/api/ip", function (data) {
          const horaAtual = new Date(data.datetime).toLocaleTimeString(
            "pt-BR",
            { hour: "2-digit", minute: "2-digit" }
          );
          $("#horaAtual").text("Hora atual: " + horaAtual);
        });

        $("#loginModal").modal("show");

        $("#loginForm").on("submit", function (event) {
          event.preventDefault();
          const nome_usuario = $("#nome_usuario").val();
          const senha = $("#senha").val();
          $.post(
            "/api/login",
            { nome_usuario, senha },
            function (data, status) {
              if (status === "success") {
                alert("Login bem-sucedido!");
                $("#loginModal").modal("hide");
                window.location.href = "/criar-leilao.html";
              } else {
                $("#loginAlert")
                  .removeClass("d-none")
                  .text("Falha no login: " + data.error);
              }
            }
          ).fail(function () {
            $("#loginAlert")
              .removeClass("d-none")
              .text("Erro ao processar login");
          });
        });
      });
    </script>
  </body>
</html>


<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cadastro de Usuário</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <h1 class="text-center">Cadastro de Usuário</h1>
      <form id="form-cadastro">
        <div class="form-group">
          <label for="nome_usuario">Nome de Usuário</label>
          <input type="text" class="form-control" id="nome_usuario" required />
        </div>
        <div class="form-group">
          <label for="senha">Senha</label>
          <input type="password" class="form-control" id="senha" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" required />
        </div>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-user-plus"></i> Cadastrar
        </button>
        <button type="button" class="btn btn-secondary" id="voltar-login">
          <i class="fas fa-sign-in-alt"></i> Voltar para Login
        </button>
      </form>
      <div
        id="cadastroAlert"
        class="alert alert-danger mt-3 d-none"
        role="alert"
      >
        Erro ao cadastrar usuário.
      </div>

      <!-- Exibição da Hora Atual -->
      <p class="text-center mt-5" id="horaAtual">Carregando...</p>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script>
      $(document).ready(function () {
        // Função para obter a hora atual formatada (HH:mm)
        function getCurrentTime() {
          const now = new Date();
          const hours = now.getHours().toString().padStart(2, "0");
          const minutes = now.getMinutes().toString().padStart(2, "0");
          return `${hours}:${minutes}`;
        }

        // Exibir hora atual (apenas hora e minuto)
        $.get("http://worldtimeapi.org/api/ip", function (data) {
          const hora = new Date(data.datetime).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          });
          $("#horaAtual").text("Hora atual: " + hora);
        });

        // Redirecionar para a página de login ao clicar no botão "Voltar para Login"
        $("#voltar-login").on("click", function () {
          window.location.href = "\\index.html";
        });

        // Processar o formulário de cadastro
        $("#form-cadastro").on("submit", function (event) {
          event.preventDefault();
          const formData = {
            nome_usuario: $("#nome_usuario").val(),
            senha: $("#senha").val(),
            email: $("#email").val(),
          };
          $.post("/api/cadastro", formData, function (data, status) {
            if (status === "success") {
              alert("Cadastro realizado com sucesso!");
              window.location.href = "/index.html";
            } else {
              $("#cadastroAlert")
                .removeClass("d-none")
                .text("Erro ao cadastrar usuário: " + data.error);
            }
          }).fail(function () {
            $("#cadastroAlert")
              .removeClass("d-none")
              .text("Falha ao processar o cadastro");
          });
        });
      });
    </script>
  </body>
</html>
