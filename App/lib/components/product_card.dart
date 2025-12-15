import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../constants.dart';
import '../models/Product.dart';

class SliverProductListItem extends StatelessWidget {
  const SliverProductListItem({
    Key? key,
    required this.product,
    required this.onTap,
  }) : super(key: key);

  final Product product;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent, // better for slivers
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 6,
                offset: const Offset(0, 3),
              ),
            ],
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // IMAGE
              Container(
                height: 90,
                width: 90,
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: kSecondaryColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Image.asset(product.images[0], fit: BoxFit.contain),
              ),

              const SizedBox(width: 12),

              // DETAILS
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      product.title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    const SizedBox(height: 6),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          "\$${product.price}",
                          style: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            color: kPrimaryColor,
                          ),
                        ),
                        InkWell(
                          borderRadius: BorderRadius.circular(50),
                          onTap: () {},
                          child: Container(
                            padding: const EdgeInsets.all(6),
                            height: 28,
                            width: 28,
                            decoration: BoxDecoration(
                              color: product.isFavourite
                                  ? kPrimaryColor.withOpacity(0.15)
                                  : kSecondaryColor.withOpacity(0.1),
                              shape: BoxShape.circle,
                            ),
                            child: SvgPicture.asset(
                              "assets/icons/Heart Icon_2.svg",
                              colorFilter: ColorFilter.mode(
                                product.isFavourite
                                    ? const Color(0xFFFF4848)
                                    : const Color(0xFFDBDEE4),
                                BlendMode.srcIn,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
