document.addEventListener("DOMContentLoaded", () => {

    console.log("RH sem Complicação - JavaScript carregado com sucesso.");

    // =====================================================
    // FUNÇÕES AUXILIARES
    // =====================================================

    function pegarNumero(id) {
        const campo = document.getElementById(id);

        if (!campo) {
            console.error(`Campo não encontrado: ${id}`);
            return 0;
        }

        let valor = campo.value;

        // Aceita também valores digitados com vírgula
        valor = String(valor).replace(",", ".");

        return Number.parseFloat(valor) || 0;
    }


    function reais(valor) {
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }


    function mostrarErro(idResultado, titulo, mensagem) {

        const resultado = document.getElementById(idResultado);

        if (!resultado) {
            console.error(`Resultado não encontrado: ${idResultado}`);
            return;
        }

        resultado.innerHTML = `
            <span>⚠️ ATENÇÃO</span>
            <strong>${titulo}</strong>
            <small>${mensagem}</small>
        `;
    }


    function mostrarResultado(idResultado, titulo, valor, detalhes = "") {

        const resultado = document.getElementById(idResultado);

        if (!resultado) {
            console.error(`Resultado não encontrado: ${idResultado}`);
            return;
        }

        resultado.innerHTML = `
            <span>${titulo}</span>
            <strong>${reais(valor)}</strong>
            <small>${detalhes}</small>
        `;
    }


    // =====================================================
    // MENU MOBILE
    // =====================================================

    const menuButton = document.getElementById("menuButton");
    const menu = document.getElementById("menu");

    if (menuButton && menu) {

        menuButton.addEventListener("click", () => {
            menu.classList.toggle("open");

            const aberto = menu.classList.contains("open");

            menuButton.setAttribute(
                "aria-expanded",
                aberto ? "true" : "false"
            );
        });


        const menuLinks = menu.querySelectorAll("a");

        menuLinks.forEach(link => {

            link.addEventListener("click", () => {
                menu.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");
            });

        });
    }


    // =====================================================
    // CALCULADORA DE 13º SALÁRIO
    // =====================================================

    const botao13 = document.getElementById("calculate13");

    if (botao13) {

        botao13.addEventListener("click", () => {

            const salario = pegarNumero("salary");
            const meses = pegarNumero("months");

            if (salario <= 0) {

                mostrarErro(
                    "result13",
                    "Informe o salário",
                    "Digite seu salário bruto."
                );

                return;
            }


            if (meses < 1 || meses > 12) {

                mostrarErro(
                    "result13",
                    "Meses inválidos",
                    "Informe uma quantidade entre 1 e 12 meses."
                );

                return;
            }


            const valor13 = (salario / 12) * meses;


            mostrarResultado(
                "result13",
                "🎄 13º SALÁRIO ESTIMADO",
                valor13,
                `${meses} mês(es) considerado(s).`
            );

        });

    }


    // =====================================================
    // CALCULADORA DE FÉRIAS
    // =====================================================

    const botaoFerias =
        document.getElementById("calculateFerias");

    if (botaoFerias) {

        botaoFerias.addEventListener("click", () => {

            const salario =
                pegarNumero("feriasSalary");

            const dias =
                pegarNumero("feriasDays");


            if (salario <= 0) {

                mostrarErro(
                    "resultFerias",
                    "Informe o salário",
                    "Digite seu salário bruto."
                );

                return;
            }


            if (dias < 1 || dias > 30) {

                mostrarErro(
                    "resultFerias",
                    "Dias inválidos",
                    "Informe entre 1 e 30 dias de férias."
                );

                return;
            }


            const valorDias =
                (salario / 30) * dias;


            const umTerco =
                valorDias / 3;


            const total =
                valorDias + umTerco;


            mostrarResultado(
                "resultFerias",
                "🌴 FÉRIAS ESTIMADAS",
                total,
                `
                Valor das férias: ${reais(valorDias)}
                <br>
                1/3 constitucional: ${reais(umTerco)}
                `
            );

        });

    }


    // =====================================================
    // CALCULADORA DE FGTS
    // =====================================================

    const botaoFgts =
        document.getElementById("calculateFgts");

    if (botaoFgts) {

        botaoFgts.addEventListener("click", () => {

            const salario =
                pegarNumero("fgtsSalary");

            const meses =
                pegarNumero("fgtsMonths");


            if (salario <= 0) {

                mostrarErro(
                    "resultFgts",
                    "Informe o salário",
                    "Digite seu salário bruto mensal."
                );

                return;
            }


            if (meses <= 0) {

                mostrarErro(
                    "resultFgts",
                    "Informe os meses",
                    "Digite a quantidade de meses trabalhados."
                );

                return;
            }


            const depositoMensal =
                salario * 0.08;


            const total =
                depositoMensal * meses;


            mostrarResultado(
                "resultFgts",
                "💰 FGTS ESTIMADO",
                total,
                `
                Depósito mensal estimado: ${reais(depositoMensal)}
                <br>
                Período: ${meses} mês(es)
                <br>
                Percentual utilizado: 8%
                `
            );

        });

    }


    // =====================================================
    // CALCULADORA DE HORAS EXTRAS
    // =====================================================

    const botaoExtra =
        document.getElementById("calculateExtra");

    if (botaoExtra) {

        botaoExtra.addEventListener("click", () => {

            const salario =
                pegarNumero("extraSalary");

            const horas =
                pegarNumero("extraHours");

            const percentual =
                pegarNumero("extraPercent");


            if (salario <= 0) {

                mostrarErro(
                    "resultExtra",
                    "Informe o salário",
                    "Digite seu salário bruto."
                );

                return;
            }


            if (horas <= 0) {

                mostrarErro(
                    "resultExtra",
                    "Informe as horas",
                    "Digite a quantidade de horas extras."
                );

                return;
            }


            // Divisor padrão para jornada de 44 horas semanais
            const divisor = 220;


            // Valor da hora normal
            const valorHora =
                salario / divisor;


            // Percentual do adicional
            const adicional =
                percentual / 100;


            // Valor da hora extra
            const valorHoraExtra =
                valorHora * (1 + adicional);


            // Total
            const total =
                valorHoraExtra * horas;


            mostrarResultado(
                "resultExtra",
                "⏱️ HORAS EXTRAS ESTIMADAS",
                total,
                `
                Valor da hora normal: ${reais(valorHora)}
                <br>
                Adicional: ${percentual}%
                <br>
                Valor da hora extra: ${reais(valorHoraExtra)}
                <br>
                Quantidade: ${horas} hora(s)
                `
            );

        });

    }


    // =====================================================
    // CALCULADORA DE RESCISÃO
    // =====================================================

    const botaoRescisao =
        document.getElementById("calculateRescisao");

    if (botaoRescisao) {

        botaoRescisao.addEventListener("click", () => {

            const salario =
                pegarNumero("rescisaoSalary");

            const meses =
                pegarNumero("rescisaoMonths");

            const dias =
                pegarNumero("rescisaoDays");


            if (salario <= 0) {

                mostrarErro(
                    "resultRescisao",
                    "Informe o salário",
                    "Digite seu salário bruto."
                );

                return;
            }


            if (meses < 1 || meses > 12) {

                mostrarErro(
                    "resultRescisao",
                    "Meses inválidos",
                    "Informe entre 1 e 12 meses."
                );

                return;
            }


            if (dias < 0 || dias > 31) {

                mostrarErro(
                    "resultRescisao",
                    "Dias inválidos",
                    "Informe de 0 a 31 dias."
                );

                return;
            }


            // =================================================
            // SALDO DE SALÁRIO
            // =================================================

            const saldoSalario =
                (salario / 30) * dias;


            // =================================================
            // 13º PROPORCIONAL
            // =================================================

            const decimo =
                (salario / 12) * meses;


            // =================================================
            // FÉRIAS PROPORCIONAIS
            // =================================================

            const ferias =
                (salario / 12) * meses;


            // =================================================
            // 1/3 CONSTITUCIONAL
            // =================================================

            const umTerco =
                ferias / 3;


            // =================================================
            // TOTAL DE FÉRIAS
            // =================================================

            const totalFerias =
                ferias + umTerco;


            // =================================================
            // TOTAL SIMPLIFICADO
            // =================================================

            const total =
                saldoSalario +
                decimo +
                totalFerias;


            mostrarResultado(
                "resultRescisao",
                "📄 RESCISÃO ESTIMADA",
                total,
                `
                Saldo de salário: ${reais(saldoSalario)}
                <br>
                13º proporcional: ${reais(decimo)}
                <br>
                Férias proporcionais: ${reais(ferias)}
                <br>
                1/3 de férias: ${reais(umTerco)}
                <br><br>
                <strong>Estimativa simplificada.</strong>
                `
            );

        });

    }


    // =====================================================
    // ANO AUTOMÁTICO
    // =====================================================

    const ano =
        document.getElementById("year");

    if (ano) {
        ano.textContent =
            new Date().getFullYear();
    }


    // =====================================================
    // VERIFICAÇÃO DOS BOTÕES
    // =====================================================

    console.log(
        "Calculadora 13º:",
        botao13 ? "OK" : "NÃO ENCONTRADA"
    );

    console.log(
        "Calculadora férias:",
        botaoFerias ? "OK" : "NÃO ENCONTRADA"
    );

    console.log(
        "Calculadora FGTS:",
        botaoFgts ? "OK" : "NÃO ENCONTRADA"
    );

    console.log(
        "Calculadora horas extras:",
        botaoExtra ? "OK" : "NÃO ENCONTRADA"
    );

    console.log(
        "Calculadora rescisão:",
        botaoRescisao ? "OK" : "NÃO ENCONTRADA"
    );

});