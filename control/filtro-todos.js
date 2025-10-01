 (function () {
  // descobre nome do arquivo da página, ex: "sala.html"
  const path = window.location.pathname;
  const file = path.split("/").pop().replace(".html", "");

  // Mapeia ranges por página
  const PAGE_RANGES = {
    todosProdutos: [1, 68],
    sala: [1, 10],
    jardim: [11, 23],
    quarto: [30, 59],
    escritorio: [60, 68],
  };

  // Se não reconhece a página, não roda
  if (!PAGE_RANGES[file]) return;

  const DATA_URL = "../model/produtos.json";
  const grid = document.getElementById("grid");
  const form = document.getElementById("formFiltroEsq");
  const btnAplicar = document.getElementById("aplicarFiltroEsq");
  const btnLimpar = document.getElementById("limparFiltroEsq");
  const minEl = document.getElementById("precoMin");
  const maxEl = document.getElementById("precoMax");

  let all = [];

  // --- utils ---
  const norm = (s) =>
    (s || "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
  function tiposDoNome(nome) {
    const n = norm(nome);
    const out = [];
    if (/\bmesa(s)?\b/.test(n)) out.push("mesa");
    if (/\bcadeira(s)?\b/.test(n)) out.push("cadeira");
    if (/\bcama(s)?\b/.test(n)) out.push("cama");
    if (/\bsofa\b/.test(n) || /\bsof[aá]\b/.test(n)) out.push("sofa");
    if (/\bpoltrona(s)?\b/.test(n)) out.push("poltrona");
    return out;
  }
  function toNumberBR(v) {
    if (typeof v === "number") return v;
    if (typeof v !== "string") return NaN;
    const s = v.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
    return parseFloat(s);
  }
  function brl(v) {
    try {
      return Number(v).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } catch {
      return v;
    }
  }

  // Render com seu visual
  function render(lista) {
    grid.innerHTML = "";
    if (!lista.length) {
      grid.innerHTML =
        "<div class='msg-vazio'><p>Nenhum produto encontrado para o(s) filtro(s) selecionado(s).</p></div>";
      return;
    }
    lista.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = p.imagem;
      img.alt = p.nome;

      const info = document.createElement("div");
      info.className = "card-info";
      info.textContent = `${p.nome} - (${brl(p._precoNum ?? p.preco)})`;

      //const btnCar = document.createElement("button");
      //btnCar.className = "btn-add-carrinho";
      //btnCar.textContent = "Adicionar ao carrinho";
      //btnCar.addEventListener("click", () => {
      //  if (typeof adicionarAoCarrinho === "function") {
      //    adicionarAoCarrinho(p.nome, p.id, p.preco, p.imagem);
      //  }
      //});

      //const btnFav = document.createElement("button");
      //btnFav.className = "btn-add-fav";
      //btnFav.textContent = "Adicionar a favoritos";
      //btnFav.addEventListener("click", () => {
      //  if (typeof adicionarAFavoritos === "function") {
      //    adicionarAFavoritos(p.nome, p.id, p.preco, p.imagem);
      //  }
      //});

      const link = document.createElement('a');
      link.href = `produto.html?id=${p.id}`;
      link.className = 'link-produto';

      link.innerHTML = `
        <button class="btn-add-carrinho">Ver produto</button>
      `;

      card.appendChild(img);
      card.appendChild(info);
      card.appendChild(link);
      //card.appendChild(btnCar);
      //card.appendChild(btnFav);
      grid.appendChild(card);
    });
  }

  function selecionados() {
    return Array.from(form.querySelectorAll("input[name='tipo']:checked")).map(
      (i) => i.value
    );
  }

  function aplicaFiltro() {
    const selTipos = selecionados();
    const min = minEl && minEl.value !== "" ? Number(minEl.value) : -Infinity;
    const max = maxEl && maxEl.value !== "" ? Number(maxEl.value) : Infinity;

    const lista = all.filter((p) => {
      const okTipo =
        selTipos.length === 0 ? true : p._tipos.some((t) => selTipos.includes(t));
      const precoNum =
        typeof p._precoNum === "number" ? p._precoNum : toNumberBR(p.preco);
      const okPreco = precoNum >= min && precoNum <= max;
      return okTipo && okPreco;
    });

    render(lista);
  }

  // Eventos
  if (btnAplicar) btnAplicar.addEventListener("click", aplicaFiltro);
  if (btnLimpar)
    btnLimpar.addEventListener("click", () => {
      form && form.reset();
      if (minEl) minEl.value = "";
      if (maxEl) maxEl.value = "";
      render(all);
    });

  // Carregar produtos do JSON e filtrar pelo range da página
  fetch(DATA_URL)
    .then((r) => r.json())
    .then((d) => {
      const [lo, hi] = PAGE_RANGES[file];
      const produtos = d.produtos || [];
      const daPagina = produtos.filter(
        (p) => Number(p.id) >= lo && Number(p.id) <= hi
      );

      all = daPagina.map((p) => ({
        ...p,
        _tipos: tiposDoNome(p.nome),
        _precoNum: toNumberBR(p.preco),
      }));

      render(all);
    })
    .catch((err) => {
      console.error("Erro ao carregar produtos:", err);
      grid.innerHTML = "<p class='msg-vazio'>Erro ao carregar produtos.</p>";
    });
})();