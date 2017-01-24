(function () {
    ko.bindingHandlers.nssgTh = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var NAMESPACE = 'nssgTh';
            var col = valueAccessor();
            var gridVM = ko.unwrap(bindingContext.$component);
            var $th = $(element);
            var $document = $(document);
            var $container = $(element).closest('.nssg-container');
            var $colGrip = null;

            /**************************/
            /**     COLUMN SORTING   **/
            /**************************/
            var isSortable = col.isSortable;
            var isSorted = col.isSorted;
            var isSortedAsc = col.isSorted && col.isSortedAsc;
            var isSortedDesc = col.isSorted && !col.isSortedAsc;

            /***************************/
            /**     COLUMN RESIZING   **/
            /***************************/
            /*
            var startX;
            var startWidth;

            function onColGripClick() {
                return false;
            }


            function onColGripMouseDown(e) {
                startX = e.pageX;
                startWidth = $th.outerWidth();

                $document
                    .on('mousemove.' + NAMESPACE, onDocumentMouseMove)
                    .one('mouseup.' + NAMESPACE, onDocumentMouseUp);
            }

            function onDocumentMouseMove(e) {
                var currentWidth = $th.outerWidth();
                var newWidth = startWidth + (e.pageX - startX);
                var difference = newWidth - currentWidth;

                var $table = $('.nssg-table', $container);
                var tableWidth = $table.outerWidth();
                var newTableWidth = tableWidth + difference;

                if (newTableWidth >= $container.width()) {
                    $table.outerWidth(newTableWidth);
                    $th.outerWidth(newWidth);
                }
            }

            function onDocumentMouseUp(e) {
                var colWidth = startWidth + (e.pageX - startX);
                col.width = colWidth;

                $document.off('.' + NAMESPACE);

                // Tell the grid that something has changed
                gridVM.emitChange();
            }

            if (gridVM.options.resizable && col.resizable !== false) {
                $colGrip = $('<div></div>')
                    .addClass('nssg-col-grip')
                    .appendTo($th)
                    .on('click.' + NAMESPACE, onColGripClick)
                    .on('mousedown.' + NAMESPACE, onColGripMouseDown);
            }

            /***************************/
            /**     COLUMN TEMPLATE   **/
            /***************************/
            $th
                .addClass('nssg-th-' + col.type)
                .outerWidth(col.width)
                .append(templates[col.type + '-th']);

            /*********************/
            /**     DISPLOSAL   **/
            /*********************/
            /*
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                if ($colGrip) {
                    $colGrip.off('.' + NAMESPACE);
                }

                $document.off('.' + NAMESPACE);
            });

            /************************/
            /**     DATA BINDING   **/
            /************************/
            ko.applyBindingsToNode(element, {
                css: {
                    'nssg-sortable': isSortable,
                    'nssg-sorted': isSorted,
                    'nssg-sorted-asc': isSortedAsc,
                    'nssg-sorted-desc': isSortedDesc
                }
            });
        }
    }
}());
