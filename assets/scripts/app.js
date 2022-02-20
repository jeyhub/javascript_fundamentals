class Product {
    // title = "DEFAULT";
    // imageUrl;
    // description;
    // price;

    constructor(title, image, desc, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }
}

class ProductItem {
    constructor(product) {
        this.product = product;
    }

    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML =  `
                <div>
                    <img src="${this.product.imageUrl}" alt="${this.product.title}">
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to Card</button>
                    </div>
                </div>
            `;
        return prodEl;
    }

}

class ProductList {
    products = [
        new Product('A pillow',
            'https://contents.mediadecathlon.com/p1749048/f0b275c3207e208e12771a5c385d3ff8/p1749048.jpg',
            'A soft pillow',
            19.99),
        new Product('A carpet',
            'https://thumbs.dreamstime.com/b/persian-carpet-texture-21684751.jpg',
            'A beautiful carpet',
            29.99)
    ];

    constructor() {}

    render() {
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const productItem = new ProductItem(prod);
            const prodEl = productItem.render();
            prodList.append(prodEl);
        }
        renderHook.append(prodList);
    }
}

// const productList = {
//     products : [],
//     render() {}
// };

// productList.render();

const productList = new ProductList();
productList.render();