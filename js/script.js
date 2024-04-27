const shops = [
    { name: "トリトン", address: "北海道札幌市東区 北８条東５丁目１９−１", name2: "とりとん", link: "shops/toriton.html", /*category: "お寿司、おすし"*/ },
    { name: "みなとや", address: "北海道稚内市 ノシャップ２丁目４−７", name2: "みなとや", link: "shops/minatoya.html", /*category: "海鮮丼、かいせんどん"*/ },
    { name: "信玄", address: "北海道石狩市 花川南１条１丁目５", name2: "しんげん", link: "shops/singen.html", /*category: "ラーメン"*/ },
    { name: "ニセコミルク工房", address: "北海道虻田郡ニセコ町 元町７７−１０", name2: "にせこみるくこうぼう", link: "shops/niseko mirukukoubou.html", /*category: "ソフトクリーム"*/ },
    { name: "Ruhiel", address: "北海道虻田郡倶知安町 山田３４−６２", name2: "るひえる", link: "shops/Ruhiel.html", category: "ジェラート" },
    { name: "小舟", address: "北海道室蘭市 絵鞆町２丁目８−１３", name2: "こぶね", link: "shops/kobunr.html", /*category: "焼き鳥丼、やきとりどん"*/ },
    { name: "舌とハラミ肉猿", address: "北海道札幌市中央区 南6条西3丁目6-2 TAKARA6・3ビル 1F", name2: "したとはらみにくざる", link: "shops/sitatoharami.html", /*category: "焼肉、やきにく"*/ },
    { name: "のぼりべつクマ牧場", address: "北海道登別市 登別温泉町２２４", name2: "のぼりべつくまぼくじょう", link: "shops/noboribetukumabokuzyou.html", /*category: "動物園、どうぶつえん"*/ },
    { name: "Rojiura Curry SAMURAI. さくら", address: "北海道札幌市中央区 南3条西6丁目1-3 ティアラ36 2F", name2: "ろじうらかれーさむらいさくら", link: "shops/su-pukare.samurai.html", /*category: "スープカレー"*/ },
    { name: "まん作", address: "北海道空知郡上富良野町 西町２丁目１", name2: "まんさく", link: "shops/mansaku.html", /*category: "お蕎麦、おそば"*/ },
    { name: "藤春食堂", address: "秋田県横手市 大屋新町堂ノ前２２−３", name2: "ふじはるしょくどう", link: "shops/huziharusyokudou.html", /*category: "焼きそば、やきそば"*/ },
    { name: "筑膳", address: "茨城県つくば市 沼田１４４１−１", name2: "ちくぜん", link: "shops/tikuzen.html", /*category: "お蕎麦、おそば"*/ },
    { name: "#", address: "", name2: "", link: "#" }
];

// 全角、半角を自動修正
function normalize(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - (0x2121 - 0x21));
    }).replace(/[ぁ-んァ-ヶ]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - (s >= "ァ" ? 0x60 : 0)); // カタカナをひらがなに、ひらがなをカタカナに変換
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
    
    const filteredShops = shops.filter(shop => {
        const normalizedName = normalize(shop.name).toLowerCase();
        const normalizedAddress = normalize(shop.address).toLowerCase();
        const normalizedName2 = normalize(shop.name2 || "").toLowerCase();
        const normalizedCategory = normalize(shop.category || "").toLowerCase();
        return normalizedName.includes(searchTerm) || //店舗名を正規化
               normalizedAddress.includes(searchTerm) || //住所を正規化
               normalizedName2.includes(searchTerm);  //店舗名２を正規化
    });

    if (filteredShops.length === 0) {
        document.getElementById("noResultsMessage").style.display = "block";
    } else {
        document.getElementById("noResultsMessage").style.display = "none";
        filteredShops.forEach(shop => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            // 住所の区までは表示
            const addressParts = shop.address.split(" ");
            const addressToShow = addressParts.length > 0 ? addressParts[0] : "";
            link.textContent = `${shop.name} - ${addressToShow}`; 
            link.href = shop.link;
            link.classList.add("searchResult"); // CSSクラスを追加
            listItem.appendChild(link);
            searchResults.appendChild(listItem);
        });
    }
}
