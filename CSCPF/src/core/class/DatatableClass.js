class DatatableClass {
  constructor(
    calculateWidths,
    caption,
    customFilter,
    customSort,
    dark,
    dense,
    disableFiltering,
    disablePagination,
    disableSort,
    expandIcon,
    expanded,
    fixedHeader,
    footerProps,
    groupBy,
    groupDesc,
    headerProps,
    headers,
    headersLength,
    height,
    hideDefaultFooter,
    hideDefaultHeader,
    itemKey,
    itemsPerPage,
    light,
    loading,
    loadingText,
    locale,
    mobileBreakpoint,
    multiSort,
    mustSort,
    noDataText,
    noResultsText,
    options,
    page,
    search,
    serverItemsLength,
    showExpand,
    showGroupBy,
    showSelect,
    singleExpand,
    singleSelect,
    sortBy,
    sortDesc
  ) {
    this.calculateWidths = calculateWidths || false;
    this.caption = caption;
    this.customFilter = customFilter;
    this.customSort = customSort;
    this.dark = dark || false;
    this.dense = dense || false;
    this.disableFiltering = disableFiltering || false;
    this.disablePagination = disablePagination || false;
    this.disableSort = disableSort || false;
    this.expandIcon = expandIcon || "$expand";
    this.expanded = expanded || [];
    this.fixedHeader = fixedHeader || false;
    this.footerProps = footerProps;
    this.groupBy = groupBy || [];
    this.groupDesc = groupDesc || [];
    this.headerProps = headerProps;
    this.headers = headers;
    this.headersLength = headersLength;
    this.height = height;
    this.hideDefaultFooter = hideDefaultFooter || false;
    this.hideDefaultHeader = hideDefaultHeader || false;
    this.itemKey = itemKey || "id";
    this.itemsPerPage = itemsPerPage || 10;
    this.light = light || false;
    this.loading = loading;
    this.loadingText = loadingText || "$vuetify.dataIterator.loadingText";
    this.locale = locale || "tr-TR";
    this.mobileBreakpoint = mobileBreakpoint || 600;
    this.multiSort = multiSort || false;
    this.mustSort = mustSort || false;
    this.noDataText = noDataText || "Kayıt Yok";
    this.noResultsText = noResultsText || "Sonuç bulunamadı!";
    this.options = options || {};
    this.page = page || 1;
    this.search = search;
    this.serverItemsLength = serverItemsLength || -1;
    this.showExpand = showExpand || false;
    this.showGroupBy = showGroupBy || false;
    this.showSelect = showSelect || false;
    this.singleExpand = singleExpand || false;
    this.singleSelect = singleSelect || false;
    this.sortBy = sortBy || [];
    this.sortDesc = sortDesc || [];
  }
}

export default DatatableClass;
