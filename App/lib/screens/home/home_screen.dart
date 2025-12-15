import 'package:flutter/material.dart';

import 'components/home_header.dart';
import 'package:app/components/product_card.dart';
import 'package:app/models/Product.dart';

class HomeScreen extends StatelessWidget {
  static String routeName = "/home";

  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            SliverAppBar(
              pinned: true,
              floating: true,
              toolbarHeight: 70,
              automaticallyImplyLeading: false,
              title: HomeHeader(),
            ),
            SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) => SliverProductListItem(
                  product: demoProducts[index],
                  onTap: () {
                    print("Tapped ${demoProducts[index].title}");
                  },
                ),
                childCount: demoProducts.length,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
