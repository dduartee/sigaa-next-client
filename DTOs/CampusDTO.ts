export interface ICampusDTOProps {
  name: string;
  acronym: string;
  institution: string;
}

export interface ICampusDTO {
  toJSON(): ICampusDTOProps;
}

export class CampusDTO implements ICampusDTO {
  constructor(
    public name: string,
    public acronym: string,
    public institution: string
  ) {}

  toJSON(): ICampusDTOProps {
    return {
      name: this.name,
      acronym: this.acronym,
      institution: this.institution,
    };
  }
}
