// wrapper script

// IE10
// Chrome
// FF

// Igor Saric

// full version at https://github.com/karabaja4/wrapper

function wrap(selector: string): Wrapper
{
    return (new Wrapper(document, null)).wrap(selector);
}

class Wrapper
{
    private _scope: Document | HTMLElement;
    private _elements: Array<HTMLElement>;

    constructor(scope: Document | HTMLElement, elements: Array<HTMLElement>)
    {
        this._scope = scope;
        this._elements = elements;
    }

    public wrap(selector: string): Wrapper
    {
        var elements: Array<HTMLElement> = new Array<HTMLElement>();

        if (selector && this._scope && selector.charAt(0) === '#')
        {
            var htmlElement = document.getElementById(selector.substring(1));
            if (htmlElement)
            {
                elements.push(htmlElement);
            }
        }

        var scope = elements.length > 0 ? elements[0] : null;
        return new Wrapper(scope, elements);
    }

    private first(): HTMLElement
    {
        if (this.any())
        {
            return this._elements[0];
        }

        return null;
    }

    private shiftProps(element: HTMLElement, props: string, value: any): any
    {
        if (props && element)
        {
            var array = props.split('.');
            var prop: any = element;

            while (array.length > 1)
            {
                prop = prop[array.shift()];
            }

            if (value === null)
            {
                return prop[array.shift()];
            }
            else
            {
                prop[array.shift()] = value;
            }
        }

        return null;
    }

    private prop(props: string, value: any): any
    {
        if (value === null)
        {
            return this.shiftProps(this.first(), props, null);
        }
        else
        {
            this._elements.forEach(x => this.shiftProps(x, props, value));
        }

        return null;
    }

    // public methods below this point
    public any(): boolean
    {
        return this._elements.length > 0;
    }

    // classes
    public hasClass(className: string): boolean
    {
        return this._elements.some(x =>
        {
            return x.classList.contains(className);
        });
    }

    public addClass(className: string)
    {
        this._elements.forEach(x => 
        {
            if (!x.classList.contains(className))
            {
                x.classList.add(className);
            }
        });
    }

    public removeClass(className: string)
    {
        this._elements.forEach(x => 
        {
            x.classList.remove(className);
        });
    }
  
    public val(value: string = null): string
    {
        return this.prop('value', value);
    }

    public html(value: string = null): string
    {
        return this.prop('innerHTML', value);
    }

    // boolean
    public disabled(value: boolean = null): boolean
    {
        return this.prop('disabled', value);
    }

    // event 
    public on(eventName: string, execute: (event: any, sender: HTMLElement) => void)
    {
        this._elements.forEach(x =>
        {
            x.addEventListener(eventName, (event) =>
            {
                execute(event, x);
            });
        });
    }
}

// keep under 500 lines