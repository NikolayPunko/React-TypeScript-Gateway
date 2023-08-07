export interface IOrder {
    ID?: number
    NDE: string
    PSTN: string
    DT: string
    DTDOC: string
    receiver: string
    sender: string
    ADDR: string
    DTDLR: string

}

export interface IDocumentOrder {

    "id": number,
    "supplierId": number,
    "dateCreate": number,
    "deliveryDateFrom": number,

    "buyerGln": string,
    "buyerName": string,
    "supplierGln": string,
    "supplierName": string,
    "deliveryPointGln": string,
    "deliveryPointAddress": string,
    "msgOrdersItems": IProductOrder[]




    // allowedAccessOrganizations: any
    //
    // allowedAccessReceiver: number
    // allowedAccessSender: number
    // allowedAccessStorages: any
    // buyerGln: string
    // buyerId: number
    // buyerName: string
    // cancel: boolean
    // completeMsgProvider: boolean
    // completeMsgReceiver: boolean
    // completeMsgSender: boolean
    // dateCreate: string
    // deliveryDateFrom: string
    // deliveryPointAddress: string
    // deliveryPointGln: string
    // deliveryPointId: number
    // deliveryStatus: number
    // documentDate: string
    // documentNameCode: string
    // documentNumber: string
    // functionCode: string
    // id: number
    // msgDate: string
    // msgNumber: string
    // msgOrdersItems: []
    // msgReceiverGln: string
    // msgReceiverId: number
    // msgSenderGln: string
    // msgSenderId: number
    // msgType: string
    // processingStatus: number
    // readMsgReceiver: boolean
    // readMsgSender: any
    // responseDocument: any
    // supplierGln: string
    // supplierId: number
    // supplierName: string
    // totalAmountVat: string
    // totalAmountWithVat: string
    // totalAmountWithoutVat: string
    // totalLine: number
    // totalQuantity: string
    // totalQuantityLu: string
}

export interface IProductOrder {

    // "id": null,
    // "dateCreate": null,
    "position": string,
    "gtin": string,
    "fullName": string,
    "uom": { "id": number, "name": string, "alpha3": string, "codeOkeiBy": string },
    // "action": 0,
    "quantityOrdered": string,
    // "quantityOrderedLu": null,
    // "quantityAccepted": null,
    "priceNet": string,
    // "priceWithoutVat": null,
    "vatRate": string,
    "amountVat": string,
    "amountWithVat": string,
    "amountWithoutVat": string,
    "codeByBuyer": string,
    // "codeBySupplier": null,
    // "type": null,
    // "quantityInPack": null,
    // "itemComment": null

}