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
    constructor(renderHookId, shouldRender = true) {
        this.hookId = renderHookId;
        if (shouldRender) {
            this.render();
        }

    }

    render() {
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

    orderProducts() {
        console.log("Ordering...");
        console.log(this.items);
    }

    render() {
        const cardEl = this.createRootElement('section', 'cart');
        cardEl.innerHTML = `
            <h2>Total \$${0}</h2>
            <button>Order now!</button>
        `;
        const orderButton = cardEl.querySelector('button');
        orderButton.addEventListener('click', () => this.orderProducts());
        this.totalOutput = cardEl.querySelector('h2');
    }
}

class ProductItem extends Component {
    constructor(product, renderHookId) {
        super(renderHookId, false);
        this.product = product;
        this.render();
    }

    addToCard() {
        App.addProductToCard(this.product);
    }

    render() {
        const prodEl = this.createRootElement('li', 'product-item');
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
    }

}

class ProductList extends Component {
    #products = [];

    constructor(renderHookId) {
        super(renderHookId, false);
        this.render();
        this.fetchProducts();
    }

    fetchProducts() {
        this.#products = [
            new Product('A pillow',
                'https://contents.mediadecathlon.com/p1749048/f0b275c3207e208e12771a5c385d3ff8/p1749048.jpg',
                'A soft pillow',
                19.99),
            new Product('A carpet',
                'https://thumbs.dreamstime.com/b/persian-carpet-texture-21684751.jpg',
                'A beautiful carpet',
                29.99)
        ];
        this.renderProducts();
    }

    renderProducts() {
        for (const prod of this.#products) {
            new ProductItem(prod, 'prod-list');
        }
    }

    render() {
        this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')])
        if (this.#products && this.#products.length > 0) {
            this.renderProducts();
        }
    }
}

class Shop extends Component {
    constructor() {
        super();
    }

    render() {
        this.card = new ShoppingCard('app');
        new ProductList('app');
    }
}

class App {
    static card; // removing this field won't affect

    static init() {
        const shop = new Shop();
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