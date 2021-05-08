export class GeocoderResultDefault implements GeocoderResult{
    geoObjects:Array<GeocoderObject>
    metaData:MetaData
    text:string
    constructor(response : any) {
        this.geoObjects = <Array<GeocoderObject>>response.geoObjects.get(0).properties._data.metaDataProperty.GeocoderMetaData.Address.Components
        this.metaData = response.metaData;
        this.text = new String(response.geoObjects.get(0).properties._data.text).toString();
    }
}

export interface GeocoderResult{
    geoObjects:Array<GeocoderObject>
    metaData:MetaData
    text:string
}

export interface GeocoderObject{
    kind : string;
    name : string;
}

export interface Properties{
    _data : DataProperty
}

export interface DataProperty{
    metaDataProperty : MetaDataProperty
}

export interface MetaDataProperty{
    GeocoderMetaData : GeocoderMetaData
}

export interface GeocoderMetaData{
    AddressDetails : AddressDetails,
    kind : string,
    precision : string,
    text : string
}

export interface AddressDetails{
    AddressLine : string,
    CountryNameCode : string,
    CountryName : string,
    AdministrativeArea : AdministrativeArea
}

export interface AdministrativeArea{
    AdministrativeAreaName : string,
    SubAdministrativeArea : SubAdministrativeArea,
}

export interface SubAdministrativeArea{
    SubAdministrativeAreaName : string,
    Locality : Locality
}

export interface Locality{
    LocalityName: string,
    DependentLocality : DependentLocality
}

export interface DependentLocality{
    DependentLocalityName : string
    Thoroughfare : Thoroughfare
}

export interface Thoroughfare{
    ThoroughfareName :string,
    Premise : Premise
}

export interface Premise{
    PremiseNumber : string
}

export interface MetaData{
    geocoder : Geocoder
}

export interface Geocoder{
    request :string,
    found : number,
    results : number,
    skip : number,
    suggest : any
}