import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterPaginate', pure: false })
export class FilterPaginatePipe implements PipeTransform {
  transform(data: any[], args: FilterPaginateVal): any[] {
    const filterCondition = 'Or';
    let returnData = [];
    const filtersToApply = args.filter.filter(d => Object.values(d)[0] !== '');

    if (args.clearFilter && filtersToApply.length > 0) {
      filtersToApply.forEach(singleFilter => {
        singleFilter[Object.keys(singleFilter)[0]] = '';
      });
      args.clearFilter = false;
    }

    if (data && data.length && filtersToApply && filtersToApply.length > 0) {
      data.forEach((item) => {
        if (filterCondition === 'Or') {
          let isAdded = false;
          filtersToApply.forEach(singleFilter => {
            if (!isAdded && item[Object.keys(singleFilter)[0]] && item[Object.keys(singleFilter)[0]]
              .toString().toLowerCase()
              .indexOf([Object.values(singleFilter)[0]].toString().toLowerCase()) > -1) { returnData.push(item); isAdded = true; }
          });
        } else {
          let toAddData = true;
          filtersToApply.forEach(singleFilter => {
            toAddData = (toAddData && item[Object.keys(singleFilter)[0]] && item[Object.keys(singleFilter)[0]].toString().toLowerCase()
              .indexOf([Object.values(singleFilter)[0]].toString().toLowerCase()) > -1);
          });
          if (toAddData) { returnData.push(item); }
        }
      });
    } else { returnData = data; }

    args.filterCount.count = returnData?.length;
    if (data && args.itemsPerPage) {
      if (args.filterCount.count > args.itemsPerPage) {
        const pageOffset = (args.currentPage !== 0 ? args.currentPage - 1 : 0) * args.itemsPerPage;
        returnData = returnData.slice(pageOffset, pageOffset + args.itemsPerPage);
      }
    }
    return returnData;
  }
}

export interface FilterPaginateVal {
  filter: any[];
  localSearch: string;
  itemsPerPage: number;
  currentPage: number;
  filterCount: { count: number };
  clearFilter: boolean;
  showFilter: boolean;
}
