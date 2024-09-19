import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as backend_idl, canisterId as backend_id } from "declarations/backend";

const agent = new HttpAgent();
const backend = Actor.createActor(backend_idl, { agent, canisterId: backend_id });

document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById("itemInput");
    const addItemButton = document.getElementById("addItemButton");
    const shoppingList = document.getElementById("shoppingList");

    const renderItems = async () => {
        const items = await backend.getItems();
        shoppingList.innerHTML = "";
        items.forEach(item => {
            const li = document.createElement("li");
            li.className = item.completed ? "completed" : "";
            li.innerHTML = `
                ${item.name}
                <span>
                    <i class="fas fa-check" onclick="toggleItem(${item.id})"></i>
                    <i class="fas fa-trash" onclick="deleteItem(${item.id})"></i>
                </span>
            `;
            shoppingList.appendChild(li);
        });
    };

    window.toggleItem = async (id) => {
        await backend.toggleItemCompletion(id);
        renderItems();
    };

    window.deleteItem = async (id) => {
        await backend.deleteItem(id);
        renderItems();
    };

    addItemButton.addEventListener("click", async () => {
        const name = itemInput.value.trim();
        if (name) {
            await backend.addItem(name);
            itemInput.value = "";
            renderItems();
        }
    });

    renderItems();
});
