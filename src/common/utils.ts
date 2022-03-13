import {v4 as uuidv4} from 'uuid';
import {SortingByDateType} from "./types/sortingTypes";
import {EARLIEST} from "./constants";
import moment from "moment";

export const addUniqueId = (array: Array<any>): Array<any> => {
    return array.map((element): any => ({...element, 'uniqueId': uuidv4()}));
}

export const isValidDate = (d: any): boolean=> {
    const date = moment(d);
    return date.isValid()
}

export const sortArrayByDate = (array: Array<any>, keyName: string, sortType: SortingByDateType): Array<any> => {
    const arrayWithInvalidDates = array.filter(a => !isValidDate(new Date(a.creationDate)))
    const arrayWithValidDates = array.filter(a => isValidDate(new Date(a.creationDate)))

    const sorter = (a: any, b: any) => {
        if (sortType === EARLIEST) {
            return new Date(a[keyName]).getTime() - new Date(b[keyName]).getTime();
        }
        return new Date(b[keyName]).getTime() - new Date(a[keyName]).getTime();
    };

    // Make projects with invalid dates appears at bottom
    return [...arrayWithValidDates.sort(sorter), ...arrayWithInvalidDates];
}
