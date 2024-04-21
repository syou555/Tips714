const shops = [
    { name: "トリトン", link: "https://syou555.github.io/Tips714/" },
    { name: "みなとや", link: "https://syou555.github.io/Tips714/shops/minatoya.html" },
    { name: "信玄", link: "https://syou555.github.io/Tips714/shops/singen.html" },
    { name: "ニセコアンヌプリ道の駅", link: "https://syou555.github.io/Tips714/shops/nisekoannupurimitinoeki.html" },
    { name: "Ruhiel", link: "https://syou555.github.io/Tips714/shops/Ruhiel.html" },
    { name: "小舟", link: "https://syou555.github.io/Tips714/shops/kobunr.html" },
    { name: "舌とハラミ肉猿", link: "https://syou555.github.io/Tips714/shops/sitatoharami.html" },
    { name: "のぼりべつクマ牧場", link: "https://syou555.github.io/Tips714/shops/noboribetukumabokuzyou.html" },
    { name: "#", link: "https://example.com/shop3" },
    { name: "#", link: "https://example.com/shop3" },
    { name: "#", link: "https://example.com/shop3" },
    { name: "#", link: "https://example.com/shop3" },
    { name: "#", link: "https://example.com/shop3" },
    { name: "#", link: "https://example.com/shop3" },
    { name: "#", link: "https://example.com/shop3" },
    { name: "#", link: "https://example.com/shop3" },
    { name: "#", link: "https://example.com/shop3" },
    { name: "#", link: "https://example.com/shop3" },
    { name: "#", link: "https://example.com/shop3" },
    { name: "#", link: "https://example.com/shop3" },
    { name: "#", link: "https://example.com/shop3" },
    { name: "#", link: "https://example.com/shop3" }
];

function normalize(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

document.getElementById("searchInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        search();
    }
});

function search() {
    const searchTerm = normalize(document.getElementById("searchInput").value).toLowerCase();
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";

    if (searchTerm.trim() === "") {
        document.getElementById("noResultsMessage").style.display = "none";
        return; // 入力が空の場合は何もしない
    }

    const filteredShops = shops.filter(shop => normalize(shop.name).toLowerCase().includes(searchTerm));
    if (filteredShops.length === 0) {
        document.getElementById("noResultsMessage").style.display = "block";
    } else {
        document.getElementById("noResultsMessage").style.display = "none";
        filteredShops.forEach(shop => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.textContent = shop.name;
            link.href = shop.link;
            listItem.appendChild(link);
            searchResults.appendChild(listItem);
        });
    }
}

