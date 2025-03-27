import mongoose, { mongo } from "mongoose";
import { loadType  } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const TransactionSchema = new Schema(
    {
        buyer: {
            type: String,
        },
        amount: {
            type: mongoose.Types.Currency,
            currency: "INR",
            get: (v) => v/100,
        },
        productIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transaction",
            },
        ],
    },
    { timestamps: true, toJSON: { getters: true }}
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;