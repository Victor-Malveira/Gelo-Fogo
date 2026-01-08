document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");
    const email = document.getElementById("email");
    const telefone = document.getElementById("number");
    const cpf = document.getElementById("cpf");

    function validarEmail(valor) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(valor);
    }


    telefone.addEventListener("input", function () {
        let v = telefone.value.replace(/\D/g, "");

        if (v.length > 11) v = v.slice(0, 11);

        v = v.replace(/^(\d{2})(\d)/, "($1) $2");
        v = v.replace(/(\d{5})(\d)/, "$1-$2");

        telefone.value = v;
    });

    function validarTelefone(valor) {
        const regex = /^\(\d{2}\) 9\d{4}-\d{4}$/;
        return regex.test(valor);
    }

 
    cpf.addEventListener("input", function () {
        let v = cpf.value.replace(/\D/g, "");

        if (v.length > 11) v = v.slice(0, 11);

        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        cpf.value = v;
    });

    function validarCPF(valor) {
        valor = valor.replace(/\D/g, "");

        if (valor.length !== 11) return false;


        if (/^(\d)\1+$/.test(valor)) return false;

        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) {
            soma += parseInt(valor.substring(i - 1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(valor.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(valor.substring(i - 1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(valor.substring(10, 11))) return false;

        return true;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        if (!validarEmail(email.value)) {
            alert("E-mail inválido");
            return;
        }

        if (!validarTelefone(telefone.value)) {
            alert("Telefone inválido. Use (DD) 9xxxx-xxxx");
            return;
        }

        if (!validarCPF(cpf.value)) {
            alert("CPF inválido");
            return;
        }

        form.submit();
    });

});

