import { AbsenceList } from "sigaa-api";

export interface IAbsencesDTOProps {
    list: {
        date: string;
        numOfAbsences: number;
    }[]
    total: number;
    max: number;
}

export interface IAbsencesDTO {
    toJSON(): IAbsencesDTOProps;
}

export class AbsencesDTO implements IAbsencesDTO {
	constructor(public absences: AbsenceList) { }

	toJSON(): IAbsencesDTOProps {
		return {
			list: this.absences.list.map((absence) => ({
				date: absence.date.toISOString(),
				numOfAbsences: absence.numOfAbsences
			})),
			total: this.absences.totalAbsences,
			max: this.absences.maxAbsences
		};
	}
}