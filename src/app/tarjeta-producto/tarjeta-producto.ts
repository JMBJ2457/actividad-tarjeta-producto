import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-producto.html',
  styleUrls: ['./tarjeta-producto.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TarjetaProducto {
  titulo = 'Auriculares inalámbricos Skullcandy Crushers 2';
  descripcion =
    'Auriculares Bluetooth con cancelación de ruido activa y control de bajos personalizados , con hasta 30 horas de batería.';
  precio = 3200.00;
  imagenUrl = 'producto.png';
}
