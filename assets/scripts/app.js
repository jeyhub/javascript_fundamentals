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

class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    constructor(renderHookId) {
        this.hookId = renderHookId;
    }

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);

        return rootElement;
    }
}

class ShoppingCard extends Component {
    items = [];

    constructor(renderHookId) {
        super(renderHookId);
    }

    set cardItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total \$${this.totalAmount.toFixed(2)}</h2>`;
    }

    get totalAmount() {
        const sum = this.items.reduce((prevValue, curItem) => prevValue + curItem.price, 0);
        return sum;
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cardItems = updatedItems;
    }

    render() {
        const cardEl = this.createRootElement('section', 'cart');
        cardEl.innerHTML = `
            <h2>Total \$${0}</h2>
            <button>Order now!</button>
        `;
        this.totalOutput = cardEl.querySelector('h2');
    }
}

class ProductItem {
    constructor(product) {
        this.product = product;
    }

    addToCard() {
        App.addProductToCard(this.product);
    }

    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
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
        const addCardButton = prodEl.querySelector('button');
        addCardButton.addEventListener('click', this.addToCard.bind(this));
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
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const productItem = new ProductItem(prod);
            const prodEl = productItem.render();
            prodList.append(prodEl);
        }
        return prodList;
    }
}

class Shop {

    render() {
        const renderHook = document.getElementById('app');

        this.card = new ShoppingCard('app');
        this.card.render();
        const productList = new ProductList();
        const prodListEl = productList.render();

        renderHook.append(prodListEl);
    }
}

class App {
    static card; // removing this field won't affect

    static init() {
        const shop = new Shop();
        shop.render();
        this.card = shop.card;
    }

    static addProductToCard(product) {
        this.card.addProduct(product);
    }
}

App.init();

// const productList = {
//     products : [],
//     render() {}
// };
// productList.render();