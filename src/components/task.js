import $ from 'jquery';
import Handlebars from 'handlebars';


class Task {
    constructor(title, ui) {
        this.id = Date.now();
        this.title = title || 'Learn JS';
        this.idDone = false;
        this.ui = ui;

        this.init();
    }

    init() {
        this.element = Handlebars.compile($(this.ui.template).html());
    }
}

export default Task;
