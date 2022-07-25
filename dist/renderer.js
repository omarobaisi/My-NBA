class Renderer {
  constructor(container, template, data) {
    this.container = container;
    this.template = template;
    this.data = data;
  }

  render() {
    $(this.container).empty();
    const source = $(this.template).html();
    const temp = Handlebars.compile(source);
    const newHTML = temp({ item: this.data });
    $(this.container).append(newHTML);
  }
}
