// app/components/scripts/loadFlyer.tsx

"use client";
export default function loadFlyer(containerId: string, flyerUrl: string) {
    const container = document.getElementById(containerId);

    if (container) {
        fetch(flyerUrl)
        .then(response => response.text())
        .then(html => {
            container.innerHTML = `<div class="rounded-lg overflow-hidden">${html}</div>`; // Añadir clases de Tailwind aquí
        })
        .catch(error => {
            console.error("Error al cargar el flyer:", error);
        });
    }
}