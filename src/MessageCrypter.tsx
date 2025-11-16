/* Views */
import { MessageEncrypter as Encrypter } from "./views/MessageEncrypter"
import { MessageDecrypter as Decrypter} from "./views/MessageDecrypter"

export default function MessageCrypter() {

    return (
        <div className="w-[60%] mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Message Crypter</h1>
            <div className="flex flex-col md:flex-row gap-4 border-dashed border-4 border-gray-300 p-10 text-center rounded-lg">
                <Encrypter />
                <Decrypter />
            </div>
        </div>
    )
}