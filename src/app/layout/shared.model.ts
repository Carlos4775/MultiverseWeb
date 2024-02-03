export interface PaginationVM {
    totalCount: number
    pageSize: number
    currentPage: number
    totalPages: number
    previousPageLink: null
    nextPageLink: string
}

export interface SelectVM {
    value: string
    label: string
    isActive: boolean
}

export class ProcessingListVM {
    table = false;
}
