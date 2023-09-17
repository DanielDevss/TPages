class TPages {

    constructor(table, {pagination, controlls, rowsPerPages, classItemsPages}){
        
        // elementos
        this.table = document.querySelector(table);
        this.rows = this.table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        this.paginationContainer = document.querySelector(pagination);
        this.tableControlls = {
            contentControlls: document.querySelector((controlls.Container) ? controlls.Container : ".tpages"),
            nextEl: document.querySelector(controlls.NextEl),
            prevEl: document.querySelector(controlls.PrevEl)
        }

        // ajustes adicionales
        this.rowsPerPages = rowsPerPages ? rowsPerPages : 10;
        this.totalPages = Math.ceil(this.rows.length / this.rowsPerPages);
        this.currentPage = 1;
        this.classItemsPages = classItemsPages;
    }

    _showPage(page) {

        for(let i = 0; i < this.rows.length; i ++){
            if( i < (page - 1) * this.rowsPerPages || i >= page * this.rowsPerPages) {
                this.rows[i].style.display = "none";
            }else{
                this.rows[i].style.display = "";
            }
        }
    }

    _createPagination () {

        this.paginationContainer.innerHTML = "";
        this.paginationContainer.classList.add("tpages-items");
        for(let i = 1; i <= this.totalPages; i ++){
            let itemPagination = document.createElement("button");
            itemPagination.innerHTML = i;
            itemPagination.className = "tpages-item";

            if(i === this.currentPage){
                itemPagination.classList.add("active");
            }

            itemPagination.addEventListener('click', () => {
                this.currentPage = i;
                this._updatePage();
            })

            this.paginationContainer.appendChild(itemPagination);
        }        
    }

    _updatePage () {
        this._createPagination();
        this._showPage(this.currentPage);
    }

    prev(){
        if(this.currentPage > 1){
            this.currentPage --;
            this._updatePage();
        }
    }

    next(){
        if(this.currentPage < this.totalPages){
            this.currentPage ++;
            this._updatePage();
        }
    }

    init () {

        if(this.tableControlls.nextEl.innerHTML.trim() === "" && this.tableControlls.prevEl.innerHTML.trim() === ""){
            this.tableControlls.nextEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M400-280v-400l200 200-200 200Z"/></svg>';
            this.tableControlls.prevEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M560-280 360-480l200-200v400Z"/></svg>';
        }

        this.tableControlls.nextEl.classList.add("tpages-control");
        this.tableControlls.nextEl.addEventListener("click", () => {
            this.next();
        });

        this.tableControlls.prevEl.classList.add("tpages-control")
        this.tableControlls.prevEl.addEventListener("click", () => {
            this.prev();
        });

        this._updatePage()
    }
    
}