# Overnight Image Matching Report

- Source: `~/foma-design/.scrape/incoming/Product_images/Product_Images/`
- Catalog SKUs after curation: **1279**
- Image files scanned: **53353**
- SKUs with at least one matched image: **1279**
- SKUs with **zero** matched images: **0**
- Image files matched to a SKU: **4602**
- Orphan files (no SKU match): **47194**
- Total size of matched files (would-be copy): **8.26 GB**

## Volume decision

Matched-file volume (8.26 GB) **exceeds the 500MB threshold**. Per the task constraint, images will be placed under `public/products/{SKU}/` but **not added to git**. **Status: awaiting CDN / Vercel storage decision in the morning.**

## Images per matched SKU (histogram)

| Images | SKU count |
|--------|-----------|
| 1 | 53 |
| 2 | 237 |
| 3 | 502 |
| 4 | 179 |
| 5 | 116 |
| 6 | 116 |
| 7 | 53 |
| 8 | 10 |
| 9 | 10 |
| 11 | 1 |
| 12 | 1 |
| 13 | 1 |

## Mixed-capitalization filename / SKU pairs

Match still applied (case-insensitive), recorded for audit.

| Filename SKU | Catalog SKU | Example file |
|---|---|---|
| `ptf257` | `PTF257` | `ptf257.jpg` |
| `ptf2810` | `PTF2810` | `ptf2810.jpg` |
| `adw10bk` | `ADW10BK` | `adw10bk.jpg` |
| `FSK651SETa` | `FSK651SETA` | `FSK651SETa.jpg` |
| `adw10cl` | `ADW10CL` | `adw10cl.jpg` |
| `adw8cl` | `ADW8CL` | `adw8cl.jpg` |
| `adw8bk` | `ADW8BK` | `adw8bk.jpg` |

## SKUs with 0 matched images (0)

_None — every catalog SKU got at least one image._

## Orphan files (47194)

Files whose extracted candidate did not match any catalog SKU. Most of these come from category-level marketing dirs or the non-SKU files in `All_Product_Images/large/`. Listed by directory.

- `Acrylic_Awards` — 862 files (sample: MR61G.png, iMP601BU_BLANK.png, CAA53.jpg, APW44PM.jpg, VPX816BGBK.jpg...)
- `Acrylic_Awards_dark_background` — 781 files (sample: ACG23BU_DBG.png, CAA53.jpg, CMA11_Completed.jpg, MR44BU_DBG.png, APW44PM.jpg...)
- `All_Product_Images/large` — 27248 files (sample: AAP1911.jpg, 5SRSB50.jpg, MCJ_Series_Silver.jpg, CP531002S.jpg, UN4805.jpg...)
- `Cups_and_Components` — 328 files (sample: MCJ_Series_Silver.jpg, CMC963.png, CMC861S.jpg, CMC302G.jpg, CZC701G.jpg...)
- `Drinkware` — 7 files (sample: FSK316_OPEN.png, FSK317_OPEN.png, LTM074_BLANK.png, FSK316.png, LTM074.png...)
- `Drinkware/10oz Tumblers/Decorated` — 10 files (sample: LTM7109.png, LTM7105.png, LTM7111.png, LTM7104.png, LTM7106.png...)
- `Drinkware/10oz Tumblers/Undecorated` — 10 files (sample: LTM7102_BLANK.png, LTM7109_BLANK.png, LTM7104_BLANK.png, LTM7103_BLANK.png, LTM7105_BLANK.png...)
- `Drinkware/12oz Stemless Wine Glasses/Decorated` — 1 files (sample: LTM851.png)
- `Drinkware/12oz Stemless Wine Glasses/Undecorated` — 1 files (sample: LTM851_BLANK.png)
- `Drinkware/12oz. Water Bottles/BLANK` — 1 files (sample: LWB051_BLANK.png)
- `Drinkware/12oz. Water Bottles/BLANK_LUGLID` — 1 files (sample: LWB051_LUGLID_BLANK.png)
- `Drinkware/12oz. Water Bottles/BLANK_OPEN` — 1 files (sample: LWB051_OPEN_BLANK.png)
- `Drinkware/12oz. Water Bottles/DECORATED` — 1 files (sample: LWB051.png)
- `Drinkware/12oz. Water Bottles/DECORATED_LUGLID` — 1 files (sample: LWB051_LUGLID.png)
- `Drinkware/12oz. Water Bottles/DECORATED_OPEN` — 1 files (sample: LWB051_OPEN.png)
- `Drinkware/14oz Pilsner Tumblers/DECORATED` — 1 files (sample: LTM941.png)
- `Drinkware/14oz Pilsner Tumblers/Undecorated` — 1 files (sample: LTM941_BLANK.png)
- `Drinkware/15oz Mugs/Decorated` — 1 files (sample: LCM101.png)
- `Drinkware/15oz Mugs/Undecorated` — 1 files (sample: LCM101_BLANK.png)
- `Drinkware/16oz Pints/Decorated` — 2 files (sample: LTM751.png, LTM757.png)
- `Drinkware/16oz Pints/Undecorated` — 2 files (sample: LTM757_BLANK.png, LTM751_BLANK.png)
- `Drinkware/16oz Stemless Wine Glasses/Decorated` — 2 files (sample: LTM801.png, LTM816.png)
- `Drinkware/16oz Stemless Wine Glasses/Undecorated` — 2 files (sample: LTM801_BLANK.png, LTM816_BLANK.png)
- `Drinkware/20 oz. Sports Tumblers/BLANK` — 2 files (sample: LTM830_BLANK.png, LTM831_BLANK.png)
- `Drinkware/20 oz. Sports Tumblers/DECORATED` — 2 files (sample: LTM831.png, LTM830.png)
- `Drinkware/20 oz. Water Bottles/BLANK` — 1 files (sample: LWB101_BLANK.png)
- `Drinkware/20 oz. Water Bottles/BLANK_LUGLID` — 1 files (sample: LWB101_LUGLID_BLANK.png)
- `Drinkware/20 oz. Water Bottles/BLANK_OPEN` — 1 files (sample: LWB101_OPEN_BLANK.png)
- `Drinkware/20 oz. Water Bottles/DECORATED` — 1 files (sample: LWB101.png)
- `Drinkware/20 oz. Water Bottles/DECORATED_LUGLID` — 1 files (sample: LWB101_LUGLID.png)
- `Drinkware/20 oz. Water Bottles/DECORATED_OPEN` — 1 files (sample: LWB101_OPEN.png)
- `Drinkware/20oz Pilsner Tumblers/DECORATED` — 1 files (sample: LTM971.png)
- `Drinkware/20oz Pilsner Tumblers/Undecorated` — 1 files (sample: LTM971_BLANK.png)
- `Drinkware/20oz Ringneck SliderLid/BLANK` — 1 files (sample: LTM7251_BLANK.png)
- `Drinkware/20oz Ringneck SliderLid/DECORATED` — 1 files (sample: LTM7251.png)
- `Drinkware/20oz Ringneck Tumblers/Decorated` — 1 files (sample: LTM7201.png)
- `Drinkware/20oz Ringneck Tumblers/Undecorated` — 1 files (sample: LTM7201_BLANK.png)
- `Drinkware/20oz Travel Mugs/BLANK` — 1 files (sample: LCM201_BLANK.png)
- `Drinkware/20oz Travel Mugs/DECORATED` — 1 files (sample: LCM201.png)
- `Drinkware/20oz Tumblers with Silicone Grip/Decorated` — 7 files (sample: LTM5502.png, LTM5503.png, LTM5501.png, LTM5404.png, LTM5401.png...)
- `Drinkware/20oz Tumblers with Silicone Grip/Undecorated` — 7 files (sample: LTM5401_BLANK.png, LTM5503_BLANK.png, LTM5502_BLANK.png, LTM5403_BLANK.png, LTM5501_BLANK.png...)
- `Drinkware/22oz. Skinny Tumblers/Decorated` — 1 files (sample: LTM7001.png)
- `Drinkware/22oz. Skinny Tumblers/Undecorated` — 1 files (sample: LTM7001_BLANK.png)
- `Drinkware/30oz Ringneck SliderLid/BLANK` — 1 files (sample: LTM7351_BLANK.png)
- `Drinkware/30oz Ringneck SliderLid/DECORATED` — 1 files (sample: LTM7351.png)
- `Drinkware/30oz Ringneck Tumblers/Decorated` — 1 files (sample: LTM7301.png)
- `Drinkware/30oz Ringneck Tumblers/Undecorated` — 1 files (sample: LTM7301_BLANK.png)
- `Drinkware/32 oz. Water Bottles/BLANK` — 1 files (sample: LWB201_BLANK.png)
- `Drinkware/32 oz. Water Bottles/BLANK_LUGLID` — 1 files (sample: LWB201_LUGLID_BLANK.png)
- `Drinkware/32 oz. Water Bottles/BLANK_OPEN` — 1 files (sample: LWB201_OPEN_BLANK.png)
- `Drinkware/32 oz. Water Bottles/DECORATED` — 1 files (sample: LWB201.png)
- `Drinkware/32 oz. Water Bottles/DECORATED_LUGLID` — 1 files (sample: LWB201_LUGLID.png)
- `Drinkware/32 oz. Water Bottles/DECORATED_OPEN` — 1 files (sample: LWB201_OPEN.png)
- `Drinkware/40oz Water Bottles/BLANK` — 1 files (sample: LWB301_BLANK.png)
- `Drinkware/40oz Water Bottles/BLANK_LUGLID` — 1 files (sample: LWB301_LUGLID_BLANK.png)
- `Drinkware/40oz Water Bottles/BLANK_OPEN` — 1 files (sample: LWB301_OPEN_BLANK.png)
- `Drinkware/40oz Water Bottles/DECORATED` — 1 files (sample: LWB301.png)
- `Drinkware/40oz Water Bottles/DECORATED_LUGLID` — 1 files (sample: LWB301_LUGLID.png)
- `Drinkware/40oz Water Bottles/DECORATED_OPEN` — 1 files (sample: LWB301_OPEN.png)
- `Drinkware/40oz. Tumbler` — 5 files (sample: 40ozTumblerLid_OPEN.png, 40ozTumblerLid.png, 40ozTumblerLid_OPEN2.png, 40ozStraw.png, 40ozLid_Straw.png)
- `Drinkware/Beer_Sets` — 3 files (sample: BRS125_STYLED.png, BRS125_STYLED_BLANK.png, BRS125_OPEN.png)
- `Drinkware/Bottle_Openers` — 33 files (sample: GFT537_BLANK.png, GFT559_BLANK.png, GFT546.png, GFT547.png, GFT046_BLANK.png...)
- `Drinkware/Ceramic_Mugs` — 33 files (sample: LMG13.jpg, LMG41_RAW.png, LMG12.jpg, LMG11.jpg, LMG14.jpg...)
- `Drinkware/Coasters` — 86 files (sample: GFT2080.png, WTL07_BLANK.png, CST01.jpg, CST01.png, CST15.png...)
- `Drinkware/Flasks_FlaskSets` — 86 files (sample: FSK610.png, FSK604.png, FSK603_BLANK.png, FSK319_DP.png, FSK674SET.jpg...)
- `Drinkware/Growlers/Decorated` — 2 files (sample: LGR642.png, LGR641.png)
- `Drinkware/Growlers/Undecorated` — 2 files (sample: LGR642_BLANK.png, LGR641_BLANK.png)
- `Drinkware/ION Plated Tumblers/Ghost_Black` — 8 files (sample: LTM7279_BLANK.png, LTMSET12_BLANK.png, LTM7279.png, LTM7278.png, LTM7278_BLANK.png...)
- `Drinkware/ION Plated Tumblers/Gold` — 12 files (sample: LTM7230_BLANK.png, LTM7231.png, LTM7230.png, LTM7232.png, LTM7233.png...)
- `Drinkware/ION Plated Tumblers/Pastel_BlackGhost Tumblers` — 4 files (sample: LTMSET10.png, LTMSET9.png, LTMSET9_BLANK.png, LTMSET10_BLANK.png)
- `Drinkware/ION Plated Tumblers/Prism` — 4 files (sample: LTMSET15_BLANK.png, LTMSET16_BLANK.png, LTMSET16.png, LTMSET15.png)
- `Drinkware/ION Plated Tumblers/Rose_Gold` — 4 files (sample: LTMSET14_BLANK.png, LTMSET13_BLANK.png, LTMSET13.png, LTMSET14.png)
- `Drinkware/LL_BeverageHolders` — 2 files (sample: GFT253A.png, GFT253A_BLANK.png)
- `Drinkware/LL_ShotGlass` — 40 files (sample: GFT1057_ANGLED.png, GFT1053_BLANK.png, GFT1052_ANGLED_BLANK.png, GFT1047_BLANK.png, GFT1058_BLANK.png...)
- `Drinkware/Leatherette Tumblers/20 oz Black Leatherette Tumblers/BLANK` — 1 files (sample: LTM5250SET_BLANK.png)
- `Drinkware/Leatherette Tumblers/20 oz Black Leatherette Tumblers/DECORATED` — 1 files (sample: LTM5250SET.png)
- `Drinkware/Leatherette Tumblers/40 oz Black Leatherette Tumblers/BLANK` — 1 files (sample: LTM7450SET_BLANK.png)
- `Drinkware/Leatherette Tumblers/40 oz Black Leatherette Tumblers/DECORATED` — 1 files (sample: LTM7450SET.png)
- `Drinkware/Plastic_Cups` — 13 files (sample: LPC124_BLANK.png, LPC112_STYLED2.png, LPC116L.png, LPC124_STYLED.png, LPC112.png...)
- `Drinkware/Polar Camel Accessories` — 6 files (sample: PCSTRAW1.png, CRB102.png, CRB101.png, LTM30H2.png, PCBRUSH1.png...)
- `Drinkware/Polar Camel Accessories/Silicone Straws` — 19 files (sample: SST233.png, SST232.png, SST231_END.png, SST230.png, SST231.png...)
- `Drinkware/Polar Camel Sets` — 68 files (sample: LCMSET4_BLANK.png, LBHSET5.png, LWB40SET2_BLANK.png, LSC100SET.png, LTMSET14_BLANK.png...)
- `Drinkware/Polar_Camel_GlassandDecanter_Sets/BLANK` — 12 files (sample: DG401_SINGLE_BLANK.png, DCS351_BLANK.png, DCS301_BLANK.png, DG301_BLANK.png, DC401_BLANK.png...)
- `Drinkware/Polar_Camel_GlassandDecanter_Sets/DECORATED` — 41 files (sample: DCS351_BOX.png, DG301_WBOX.png, DC401_BOXOPEN.png, DCS301.png, DC351.png...)
- `Drinkware/Polar_Camel_Glassware/BLANK` — 2 files (sample: PCG119_BLANK.png, PCG215_BLANK.png)
- `Drinkware/Polar_Camel_Glassware/DECORATED` — 3 files (sample: PCG215.png, PCG119.png, PCG215_STYLED.png)
- `Drinkware/Silicone Bottle Boots/20 oz. Boots/BLANK` — 7 files (sample: WBB052_BLANK.png, WBB004_BLANK.png, WBB002_BLANK.png, WBB053_BLANK.png, WBB003_BLANK.png...)
- `Drinkware/Silicone Bottle Boots/20 oz. Boots/DECORATED` — 7 files (sample: WBB052.png, WBB053.png, WBB051.png, WBB002.png, WBB003.png...)
- `Drinkware/Silicone Bottle Boots/40 oz. Boots/BLANK` — 7 files (sample: WBB251_BLANK.png, WBB201_BLANK.png, WBB253_BLANK.png, WBB203_BLANK.png, WBB252_BLANK.png...)
- `Drinkware/Silicone Bottle Boots/40 oz. Boots/DECORATED` — 7 files (sample: WBB251.png, WBB253.png, WBB252.png, WBB201.png, WBB203.png...)
- `Drinkware/Sippy_Cups/LID_HANDLE` — 5 files (sample: LSCLID1.png, LSCLID1_LidExample.png, LSCLID1_LidExample2.png, LSCLID1_SIDE.png, LSCHNDL1.png)
- `Drinkware/Straws` — 29 files (sample: SST233.png, SST252_RAW.png, SST232.png, SST231_END.png, SST230.png...)
- `Drinkware/Sublimatable Mug & Tumblers/Decorated` — 35 files (sample: STM622.png, SWB920_OPEN.png, SWB921_OPEN.png, STM621.png, STM631.png...)
- `Drinkware/Sublimatable Mug & Tumblers/Undecorated` — 32 files (sample: STM642_BLANK.png, SWB930_BLANK.png, SCM201_BLANK.png, STM621_BLANK.png, SBH13_BLANK.png...)
- `Drinkware/Whiskey_Stones_Set` — 5 files (sample: MRT01.png, GFT159_A.png, GFT159_StyledB_COMPLETE.png, GFT159.png, GFT159_StyledC_COMPLETE.png)
- `Drinkware/WineTools_Sets` — 245 files (sample: WTL17_COMPLETE.png, WTL13_BLANK.png, WBX51_open2.jpg, WTL05_Closed.png, WBX77_BLANK.png...)
- `Drinkware/Wine_Chillers` — 23 files (sample: GFT781.png, GFT812_Styled_BLANK.png, GFT812_BLANK.png, GFT812.png, GFT277_StyledA_COMPLETE.png...)
- `Drinkware/Wine_Chillers/BLANK` — 16 files (sample: LWC104_BOTTLE_BLANK.png, LWC103_BLANK.png, LWC101_OPEN_BLANK.png, LWC104_OPEN_BOTTLE_BLANK.png, LWC102_OPEN_BLANK.png...)
- `Drinkware/Wine_Chillers/DECORATED` — 23 files (sample: LWC101_OPEN_BOTTLE.png, LWCLIDONLY.png, LWC102_HANDLID.png, LWC101_OPEN_BOTTLE_DP.png, LWC102_BOTTLE.png...)
- `Engraving_Materials_and_Supplies` — 1300 files (sample: L-010-496(H,Q,IR).jpg, LLDISPLAY7.png, L-802-106(H,Q,IR).jpg, LF1710RD.png, LM922-082.jpg...)
- `Engraving_Materials_and_Supplies/Gemini For Web` — 128 files (sample: BR-COPPER-BLACK-SWATCH.jpg, Lagoon-SWATCH.jpg, BIRCH-BLACK-SWATCH.jpg, Light-Gray-SWATCH.jpg, GREEN-MARBLE-GOLD.jpg...)
- `Gifts_and_Engravables/All_Leatherette/LL_Binders` — 14 files (sample: GFT1348_FRONT_BLANK.png, GFT1348.png, GFT1348_FRONT.png, GFT1345_FRONT.png, GFT1258_ANGLE.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Burlap_Canvas_Bags` — 43 files (sample: GFT2282.png, GFT2281_BOTTOM_BLANK.png, GFT2283_BLANK.png, GFT2281_ANGLE_BLANK.png, GFT2284_ANGLE.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_BusinessCardHolders` — 28 files (sample: GFT870_OPEN.png, GFT869_OPEN_BLANK.png, LP466_BLANK.png, LP458.png, LP464.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_CigarCases` — 70 files (sample: GFT1011_BLANK.png, GFT1006.png, GFT1012.png, GFT1003_STYLED.png, GFT1005_BLANK.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_ClipBoards` — 9 files (sample: GFT1199.png, GFT1198.png, GFT1197_BACK.png, GFT1196_BACK_BLANK.png, GFT1196.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Clocks` — 2 files (sample: LLC102_BLANK.png, LLC102.png)
- `Gifts_and_Engravables/All_Leatherette/LL_CuffBracelet` — 33 files (sample: GFT584_BLANK.png, GFT589_FLAT_BLANK.png, GFT581_FLAT_BLANK.png, GFT589_BLANK.png, GFT587.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Desk_Wedge` — 6 files (sample: LLW3310.jpg, LLW228.jpg, LLW3210.jpg, LLW328.jpg, LLW2310.jpg...)
- `Gifts_and_Engravables/All_Leatherette/LL_DogCollars` — 28 files (sample: LLC550_BLANK.png, LLC533_BLANK.png, LLC549_BLANK.png, LLC506_BLANK.png, LLC519_BLANK.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Easel_NailSet_GlassCase` — 6 files (sample: GFT231.png, GFT268.png, GFT268_blank.png, GFT609_COMPLETE.png, GFT232-COMPLETE.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Frames` — 209 files (sample: LLF30457_ANGLED.png, LLF5810.png, LLF546.png, LLF1746_ANGLED_BLANK.png, LLF31146_BLANK.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Games_Cards` — 91 files (sample: PKR305_StyledC.png, GFT1034_STYLED.png, GFT1024_BLANK.png, PKR305_StyledB.png, GFT1039.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_GiftBoxes` — 70 files (sample: GBX64_OPEN_BLANK.png, GBX83_BLANK.png, GBX53_BLANK.png, GBX63_OPEN_BLANK.png, GBX72_BLANK.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_GolfTeeHolder` — 33 files (sample: GFT2034_BACK.png, GFT2023_BACK_BLANK.png, GFT2027_BLANK.png, GFT2033_BLANK.png, GFT2024_BACK_BLANK.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Journal_SketchBook` — 14 files (sample: GFT1227_BLANK.png, GFT2242psd.png, GFT1227_SIDE_BLANK.png, GFT1226_BLANK.png, GFT1225_OPEN.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Keychains_IDHolder` — 162 files (sample: GFT701_BLANK.png, GFT2154_BLANK.png, GFT910_BLANK.png, GFT234.png, GFT863_BLANK.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Mirrors` — 41 files (sample: GFT1300_OPEN_BK.png, GFT1302_BLANK.png, GFT1296_OPEN_BK.png, GFT1307_BACK_BLANK.png, GFT1307_FLAT.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Ornaments` — 75 files (sample: GFT1097_BLANK.png, GFT1083_BLANK.png, GFT1066_BLANK.png, GFT1101_BLANK.png, GFT1091_BLANK.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Passport_LuggageTag` — 2 files (sample: GFT887_BLANK.png, GFT887.png)
- `Gifts_and_Engravables/All_Leatherette/LL_Patches` — 616 files (sample: PTH286.png, PTH911_BLANK.png, PTH279.png, PTH316_BLANK.png, LPTH101.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_PenPad` — 9 files (sample: GFT981_OPEN.png, GFT880_BLANK.png, GFT214_BLANK.png, GFT214_Open.png, GFT880.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Portfolios` — 22 files (sample: GFT1212_BLANK.png, GFT1213.png, GFT390_Open.png, GFT1212.png, GFT884_OPEN_BLANK.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Power_Bank_Pad` — 32 files (sample: GFT1139_BLANK.png, GFT1143_BLANK.png, GFT1148.png, GFT1145_BLANK.png, GFT1148_BLANK.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Smoke_Cord_Cases` — 65 files (sample: GFT2452.png, GFT2482_BLANK.png, GFT2451_OPENSTYLED.png, GFT2462_BACK.png, GFT2450.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Swatches` — 42 files (sample: LLS101_SWATCH.png, LLA214.png, LLS110_SWATCH.png, LLA213_SWATCH.png, LLS109_SWATCH.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Tray` — 4 files (sample: GFT1172.png, GFT1171.png, GFT1170.png, GFT1170_SET.png)
- `Gifts_and_Engravables/All_Leatherette/LL_WallDecor` — 26 files (sample: LDC0111_Angle_BLANK.png, LDC01113.png, LDC0413_BLANK.png, LDC0103.png, LDC0113_BLANK.png...)
- `Gifts_and_Engravables/All_Leatherette/LL_Wallets_MoneyClips` — 50 files (sample: GFT523_BLANK.png, GFT1131_Styled.png, GFT525_BLANK.png, GFT1041_BLANK.png, GFT1126_BLANK.png...)
- `Gifts_and_Engravables/BBQ_Sets_Tools` — 26 files (sample: BBQ02A_Open.png, BBQ12B_BLANK.png, BBQ01A.png, BBQ16_Closed_BLANK.png, BBQ03_Open.jpg...)
- `Gifts_and_Engravables/Bison_River_Knives` — 14 files (sample: BR1062_RAW.png, BRDSPLY1_STYLED_KSS.png, BRDSPLY1_STYLED2.png, BR1063_BLANK.png, BRDSPLY1_STYLED.png...)
- `Gifts_and_Engravables/Brass_Keychains` — 27 files (sample: BKR17.jpg, BKR10.jpg, BKR11.jpg, BKR13.jpg, BKR12.jpg...)
- `Gifts_and_Engravables/Cake_Pie_Pans` — 40 files (sample: PPN103LID_FLAT.png, PPN105_CLOSED.png, PPN102_STYLED_BLANK.png, PPN101LID.png, BPN102LiD.png...)
- `Gifts_and_Engravables/Candles` — 107 files (sample: CDL1001_1008_OPEN3.png, CDL1057_BLANK.png, CDL1056_OPEN_BLANK.png, CDL1053_OPEN_LIT.png, CDL1054_OPEN_LIT.png...)
- `Gifts_and_Engravables/Certificates_CertificateHolders` — 43 files (sample: CERT15.jpg, Z7BUR.png, Z7BUR.jpg, CERT14.jpg, CERT16.jpg...)
- `Gifts_and_Engravables/Champion_Rings` — 66 files (sample: CHR28G_Angle.png, RNG208G.jpg, CHR22G.jpg, CHR25G_Complete.jpg, CHR25G_Angle.png...)
- `Gifts_and_Engravables/Chenille_Pins` — 58 files (sample: CHEN161.jpg, CHEN149.jpg, CHEN162.jpg, BRDSPLY1_STYLED_KSS.png, BRDSPLY1_STYLED2.png...)
- `Gifts_and_Engravables/Cigar_Humidor` — 12 files (sample: GFT1360.png, GFT1360_BLANK.png, GFT1360_LATCHLOCK.png, GFT1360_OPEN.png, GFT1360_SEAL.png...)
- `Gifts_and_Engravables/Clocks_ExecutiveAwards` — 181 files (sample: MF002.jpg, T301.jpg, GCK001_BLANK.png, EX104.png, GCK403_BLANK.png...)
- `Gifts_and_Engravables/Cutting_Boards` — 46 files (sample: GFT590_BLANK.png, GFT135_BLANK.png, GFT591.png, GFT590.png, GFT138_BLANK.png...)
- `Gifts_and_Engravables/DeskWedges_BusinessCard` — 12 files (sample: PNA310_BLANK.png, DS5B_BLANK.png, DS5W_BLANK.png, PNA310.png, DS5B.png...)
- `Gifts_and_Engravables/DisplayCases_Ball_Flag` — 36 files (sample: ALS23.jpg, BH1-Complete.jpg, QB8.jpg, ALS21.jpg, ALS25.jpg...)
- `Gifts_and_Engravables/Games` — 21 files (sample: CHES01.jpg, CRD01_closed.jpg, CRiB01_closed.jpg, DOM01_closed.jpg, MNC01_closed.png...)
- `Gifts_and_Engravables/Gifts_Disontinued` — 14 files (sample: LBL01.jpg, LBL02.jpg, LBL03.jpg, LBL13.jpg, LBL12.jpg...)
- `Gifts_and_Engravables/Laserburst_Products` — 50 files (sample: LZB201_SPINE.png, LZGB03_HORZ.png, LZGB01-12_SLEEVE2.png, LZB301_OPEN3_BLANK.png, LZGB02_BLANK.png...)
- `Gifts_and_Engravables/Metal_Wood_Frames` — 50 files (sample: APF4810GY_BLANK.png, GFT572_573_STYLED.png, GFT572_STYLED4.png, GFT572_STYLED5.png, GFT437_FRONT.png...)
- `Gifts_and_Engravables/Pens_PenCases` — 186 files (sample: CS205_closed.jpg, LP836.jpg, LP822.jpg, LP604.jpg, CS123_COMPLETE.png...)
- `Gifts_and_Engravables/Pet Bowls/Large 64 oz. Pet Bowl` — 2 files (sample: LPB_64OZ_INSIDE.png, LPB044_BOTTOM.png)
- `Gifts_and_Engravables/Pet Bowls/Large 64 oz. Pet Bowl/Blank` — 6 files (sample: LPB045_BLANK.png, LPB043_BLANK.png, LPB044_BLANK.png, LPB042_BLANK.png, LPB041_BLANK.png...)
- `Gifts_and_Engravables/Pet Bowls/Large 64 oz. Pet Bowl/Decorated` — 6 files (sample: LPB045.png, LPB044.png, LPB046.png, LPB043.png, LPB042.png...)
- `Gifts_and_Engravables/Pet Bowls/Medium 32 oz. Pet Bowl` — 2 files (sample: LPB_32OZ_INSIDE.png, LPB024_BOTTOM.png)
- `Gifts_and_Engravables/Pet Bowls/Medium 32 oz. Pet Bowl/BLANK` — 6 files (sample: LPB026_BLANK.png, LPB021_BLANK.png, LPB024_BLANK.png, LPB022_BLANK.png, LPB025_BLANK.png...)
- `Gifts_and_Engravables/Pet Bowls/Medium 32 oz. Pet Bowl/DECORATED` — 6 files (sample: LPB026.png, LPB025.png, LPB024.png, LPB021.png, LPB023.png...)
- `Gifts_and_Engravables/Pet Bowls/Small 18 oz. Pet Bowl` — 6 files (sample: LPB003_BOTTOM.png, LPB001_BOTTOM.png, LPB004_BOTTOM.png, LPB002_BOTTOM.png, LPB005_BOTTOM.png...)
- `Gifts_and_Engravables/Pet Bowls/Small 18 oz. Pet Bowl/BLANK` — 6 files (sample: LPB001_BLANK.png, LPB006_BLANK.png, LPB005_BLANK.png, LPB003_BLANK.png, LPB004_BLANK.png...)
- `Gifts_and_Engravables/Pet Bowls/Small 18 oz. Pet Bowl/DECORATED` — 6 files (sample: LPB006.png, LPB004.png, LPB005.png, LPB001.png, LPB002.png...)
- `Gifts_and_Engravables/Pet_Tags` — 89 files (sample: PET207PK_BLANK.png, PET202RD.png, PET209BU.png, PET208PR_BLANK.png, PET201BK.png...)
- `Gifts_and_Engravables/Promotional_Items` — 239 files (sample: SWB302_BLANK.png, WLP09.jpg, TAG201PK_BLANK.png, GFT135_BLANK.png, WLC14.png...)
- `Gifts_and_Engravables/Serving_Bowls/BLANK` — 24 files (sample: LSB301_OPEN_BLANK.png, LSB202_BLANK.png, LSB202_OPEN_BLANK.png, LSB204_OPEN_BLANK.png, LSB204_BLANK.png...)
- `Gifts_and_Engravables/Serving_Bowls/BOTTOM_LID` — 10 files (sample: LSBLID2.png, LSB202_BOTTOM.png, LSBLID1.png, LSB302_BOTTOM.png, LSB303_BOTTOM.png...)
- `Gifts_and_Engravables/Serving_Bowls/DECORATED` — 32 files (sample: LSB201_LIDSIDE.png, LSB204_LIDSIDE.png, LSB302_DISC.png, LSB303_DISC.png, LSB204_OPEN.png...)
- `Gifts_and_Engravables/Silicone Bottle Boots/20 oz. Boots/BLANK` — 7 files (sample: WBB052_BLANK.png, WBB004_BLANK.png, WBB002_BLANK.png, WBB053_BLANK.png, WBB003_BLANK.png...)
- `Gifts_and_Engravables/Silicone Bottle Boots/20 oz. Boots/DECORATED` — 7 files (sample: WBB052.png, WBB053.png, WBB051.png, WBB002.png, WBB003.png...)
- `Gifts_and_Engravables/Silicone Bottle Boots/32 oz. Boots/BLANK` — 7 files (sample: WBB101_BLANK.png, WBB151_BLANK.png, WBB102_BLANK.png, WBB104_BLANK.png, WBB152_BLANK.png...)
- `Gifts_and_Engravables/Silicone Bottle Boots/32 oz. Boots/DECORATED` — 7 files (sample: WBB151.png, WBB152.png, WBB153.png, WBB101.png, WBB102.png...)
- `Gifts_and_Engravables/Silicone Bottle Boots/40 oz. Boots/BLANK` — 7 files (sample: WBB251_BLANK.png, WBB201_BLANK.png, WBB253_BLANK.png, WBB203_BLANK.png, WBB252_BLANK.png...)
- `Gifts_and_Engravables/Silicone Bottle Boots/40 oz. Boots/DECORATED` — 7 files (sample: WBB251.png, WBB253.png, WBB252.png, WBB201.png, WBB203.png...)
- `Gifts_and_Engravables/SilverTrays` — 11 files (sample: PC4031.jpg, PC1010.jpg, PC2010-complete.jpg, PC4010-complete2.jpg, PC22231.jpg...)
- `Gifts_and_Engravables/Sippy_Cups/LID_HANDLE` — 5 files (sample: LSCLID1.png, LSCLID1_LidExample.png, LSCLID1_LidExample2.png, LSCLID1_SIDE.png, LSCHNDL1.png)
- `Gifts_and_Engravables/Slate_AcaciaSlate` — 50 files (sample: SLT085.png, SLT050_BLANK.png, SST2B.jpg, SLT086.png, SLT051.png...)
- `Gifts_and_Engravables/Wooden_Boxes` — 43 files (sample: GBX23-COMPLETED.jpg, GFT437_FRONT.png, GBX21.jpg, GBX01_closed-complete.jpg, GBX23.jpg...)
- `Glass_and_Crystal` — 1006 files (sample: CRY045.jpg, CRY262L_BLANK.png, RZG02BU.png, MGL031.jpg, VAS106.png...)
- `Glass_and_Crystal_dark_background` — 555 files (sample: CGS106_BK_BLANK.png, CRY1933.png, SAC012_Angle4_DBG.png, FG57GN_DBG.jpg, CRY19001BUL.png...)
- `Glass_and_Crystal_dark_background/New Folder With Items` — 424 files (sample: ACG23BU_DBG.png, CRY71_DBG.jpg, CRY1452L_DBG.jpg, CRY137_DBG.jpg, AGS55_DBG.png...)
- `JDS_Logo` — 6 files (sample: JDS_Logo_1800px.png, JDS_Logo_300px.png, JDS_Logo_50px.png, JDS_Logo_30px.png, JDS_Logo_150px.png...)
- `Medals_Inserts_Ribbons` — 1363 files (sample: R120-6W.png, TS418G.png, ST16B.png, TS414S.png, BL303B.png...)
- `NFL_FantasyFootballTrophy` — 27 files (sample: NFL01_PWB14LW_FRONT.png, NFL01_PWB90W_FRONT_PLATES.png, NFL01_LEFTSIDE.png, NFL01_SIDE.png, NFL01_BOX_ANGLED.png...)
- `Plaques_and_Accessories` — 817 files (sample: VPN41215.jpg, ACR02_profile.jpg, LMF557.jpg, LL6-710_BLANK.png, FPG2810_COMPLETED.jpg...)
- `Plastic_Figures_Risers_and_Trim` — 1176 files (sample: FIG9515.jpg, FIG9501.jpg, RP93045.png, FIG7504.jpg, TRM8401.jpg...)
- `Resin_Economy_Awards` — 864 files (sample: RSC303.jpg, ZNR204.jpg, JDS21.jpg, SBR104.jpg, DUR1001.jpg...)
- `Sandcarving_Materials` — 67 files (sample: PEEL3510X1210S.png, R5510X1225SHT.png, RMHD12X25ROLL.png, R5510X25ROLL.png, PEEL3514X100RL.png...)
- `Sign_Supply` — 2061 files (sample: 180MC_069.png, 7775_239.png, 2100_125.png, 4310-040.png, 7775_211.png...)
- `Sign_Supply/Avery_SW900_Swatches` — 204 files (sample: A118116.png, A006328.png, A005609.png, A006314.png, A005755.png...)
- `Sign_Supply/SEF Swatches` — 85 files (sample: FM_016.png, FM_002.png, FM_003.png, FM_017.png, 5207150_APPLICATION.png...)
- `Sublimation_Products` — 1960 files (sample: Vapor_size_chart_ladies_eco_ss_run.jpg, CLX4094.png, SBL021_open.jpg, CLXM5903.jpg, LSB179.jpg...)
- `Sublimation_Products/*Stahls - Sliver not loaded` — 1 files (sample: STX20Promo24.png)
- `Sublimation_Products/*Stahls - Sliver not loaded/Chroma-Twill - Done` — 6 files (sample: MC200PCT001-5.png, MC200PCT001-25.png, MC300PCT001-25.png, MC200PCT001-10.png, MC300PCT001-10.png...)
- `Sublimation_Products/*Stahls - Sliver not loaded/Glimmer - Done` — 10 files (sample: MC000GLM505.png, MC000GLM064.png, MC000GLM298.png, STAHLS-CAD-CUT-Glimmer_application_2.png, MC000GLM003.png...)
- `Sublimation_Products/*Stahls - Sliver not loaded/Glow - Done` — 40 files (sample: MC200GLW048-50.png, MC200GLW049-5.png, MC200GLW050-25.png, MC200GLW049-10.png, MC200GLW050-5.png...)
- `Sublimation_Products/*Stahls - Sliver not loaded/Metallic Puff - Done` — 3 files (sample: MC120MPU005-0.png, MC120MPU064-0.png, STAHLS-CAD-CUT-METALLIC-PUFF_Application.png)
- `Sublimation_Products/*Stahls - Sliver not loaded/ReflectPRO - Done` — 1 files (sample: CAD-CUT_ReflectivePRO.png)
- `Sublimation_Products/*Stahls - Sliver not loaded/Reflective - Done` — 12 files (sample: MC200RII013-25.png, MC200RII186-10.png, MC200RII013-5.png, MC200RII013-50.png, MC200RII002-10.png...)
- `Sublimation_Products/Hotronix` — 4 files (sample: XRF2-240.png, XRF2-120.png, XRF2-PP-120.png, XRF2-PP-240.png)
- `Tropar_Products` — 376 files (sample: ZX2602.png, ZX900K.png, ZX1337.png, ZX2136ST.png, ZX3905.png...)
- `Trophy_Supplies` — 503 files (sample: RP84713.jpg, GX607.png, SRB08.jpg, LM152.jpg, LF601.jpg...)
- `_Polar_Camel_Complete_Collection/10oz Tumblers/Decorated` — 10 files (sample: LTM7109.png, LTM7105.png, LTM7111.png, LTM7104.png, LTM7106.png...)
- `_Polar_Camel_Complete_Collection/10oz Tumblers/Undecorated` — 10 files (sample: LTM7102_BLANK.png, LTM7109_BLANK.png, LTM7104_BLANK.png, LTM7103_BLANK.png, LTM7105_BLANK.png...)
- `_Polar_Camel_Complete_Collection/12oz Stemless Wine Glasses/Decorated` — 1 files (sample: LTM851.png)
- `_Polar_Camel_Complete_Collection/12oz Stemless Wine Glasses/Undecorated` — 1 files (sample: LTM851_BLANK.png)
- `_Polar_Camel_Complete_Collection/12oz. Water Bottles/BLANK` — 1 files (sample: LWB051_BLANK.png)
- `_Polar_Camel_Complete_Collection/12oz. Water Bottles/BLANK_LUGLID` — 1 files (sample: LWB051_LUGLID_BLANK.png)
- `_Polar_Camel_Complete_Collection/12oz. Water Bottles/BLANK_OPEN` — 1 files (sample: LWB051_OPEN_BLANK.png)
- `_Polar_Camel_Complete_Collection/12oz. Water Bottles/DECORATED` — 1 files (sample: LWB051.png)
- `_Polar_Camel_Complete_Collection/12oz. Water Bottles/DECORATED_LUGLID` — 1 files (sample: LWB051_LUGLID.png)
- `_Polar_Camel_Complete_Collection/12oz. Water Bottles/DECORATED_OPEN` — 1 files (sample: LWB051_OPEN.png)
- `_Polar_Camel_Complete_Collection/14oz Pilsner Tumblers/DECORATED` — 1 files (sample: LTM941.png)
- `_Polar_Camel_Complete_Collection/14oz Pilsner Tumblers/Undecorated` — 1 files (sample: LTM941_BLANK.png)
- `_Polar_Camel_Complete_Collection/15oz Mugs/Decorated` — 1 files (sample: LCM101.png)
- `_Polar_Camel_Complete_Collection/15oz Mugs/Undecorated` — 1 files (sample: LCM101_BLANK.png)
- `_Polar_Camel_Complete_Collection/16oz Pints/Decorated` — 2 files (sample: LTM751.png, LTM757.png)
- `_Polar_Camel_Complete_Collection/16oz Pints/Undecorated` — 2 files (sample: LTM757_BLANK.png, LTM751_BLANK.png)
- `_Polar_Camel_Complete_Collection/16oz Stemless Wine Glasses/Decorated` — 2 files (sample: LTM801.png, LTM816.png)
- `_Polar_Camel_Complete_Collection/16oz Stemless Wine Glasses/Undecorated` — 2 files (sample: LTM801_BLANK.png, LTM816_BLANK.png)
- `_Polar_Camel_Complete_Collection/20 oz. Sports Tumblers/BLANK` — 2 files (sample: LTM830_BLANK.png, LTM831_BLANK.png)
- `_Polar_Camel_Complete_Collection/20 oz. Sports Tumblers/DECORATED` — 2 files (sample: LTM831.png, LTM830.png)
- `_Polar_Camel_Complete_Collection/20 oz. Water Bottles/BLANK` — 1 files (sample: LWB101_BLANK.png)
- `_Polar_Camel_Complete_Collection/20 oz. Water Bottles/BLANK_LUGLID` — 1 files (sample: LWB101_LUGLID_BLANK.png)
- `_Polar_Camel_Complete_Collection/20 oz. Water Bottles/BLANK_OPEN` — 1 files (sample: LWB101_OPEN_BLANK.png)
- `_Polar_Camel_Complete_Collection/20 oz. Water Bottles/DECORATED` — 1 files (sample: LWB101.png)
- `_Polar_Camel_Complete_Collection/20 oz. Water Bottles/DECORATED_LUGLID` — 1 files (sample: LWB101_LUGLID.png)
- `_Polar_Camel_Complete_Collection/20 oz. Water Bottles/DECORATED_OPEN` — 1 files (sample: LWB101_OPEN.png)
- `_Polar_Camel_Complete_Collection/20oz Pilsner Tumblers/DECORATED` — 1 files (sample: LTM971.png)
- `_Polar_Camel_Complete_Collection/20oz Pilsner Tumblers/Undecorated` — 1 files (sample: LTM971_BLANK.png)
- `_Polar_Camel_Complete_Collection/20oz Ringneck SliderLid/BLANK` — 1 files (sample: LTM7251_BLANK.png)
- `_Polar_Camel_Complete_Collection/20oz Ringneck SliderLid/DECORATED` — 1 files (sample: LTM7251.png)
- `_Polar_Camel_Complete_Collection/20oz Ringneck Tumblers/Decorated` — 1 files (sample: LTM7201.png)
- `_Polar_Camel_Complete_Collection/20oz Ringneck Tumblers/Undecorated` — 1 files (sample: LTM7201_BLANK.png)
- `_Polar_Camel_Complete_Collection/20oz Travel Mugs/BLANK` — 1 files (sample: LCM201_BLANK.png)
- `_Polar_Camel_Complete_Collection/20oz Travel Mugs/DECORATED` — 1 files (sample: LCM201.png)
- `_Polar_Camel_Complete_Collection/20oz Tumblers with Silicone Grip/Decorated` — 7 files (sample: LTM5502.png, LTM5503.png, LTM5501.png, LTM5404.png, LTM5401.png...)
- `_Polar_Camel_Complete_Collection/20oz Tumblers with Silicone Grip/Undecorated` — 7 files (sample: LTM5401_BLANK.png, LTM5503_BLANK.png, LTM5502_BLANK.png, LTM5403_BLANK.png, LTM5501_BLANK.png...)
- `_Polar_Camel_Complete_Collection/22oz. Skinny Tumblers/Decorated` — 1 files (sample: LTM7001.png)
- `_Polar_Camel_Complete_Collection/22oz. Skinny Tumblers/Undecorated` — 1 files (sample: LTM7001_BLANK.png)
- `_Polar_Camel_Complete_Collection/30oz Ringneck SliderLid/BLANK` — 1 files (sample: LTM7351_BLANK.png)
- `_Polar_Camel_Complete_Collection/30oz Ringneck SliderLid/DECORATED` — 1 files (sample: LTM7351.png)
- `_Polar_Camel_Complete_Collection/30oz Ringneck Tumblers/Decorated` — 1 files (sample: LTM7301.png)
- `_Polar_Camel_Complete_Collection/30oz Ringneck Tumblers/Undecorated` — 1 files (sample: LTM7301_BLANK.png)
- `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/BLANK` — 1 files (sample: LWB201_BLANK.png)
- `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/BLANK_LUGLID` — 1 files (sample: LWB201_LUGLID_BLANK.png)
- `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/BLANK_OPEN` — 1 files (sample: LWB201_OPEN_BLANK.png)
- `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/DECORATED` — 1 files (sample: LWB201.png)
- `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/DECORATED_LUGLID` — 1 files (sample: LWB201_LUGLID.png)
- `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/DECORATED_OPEN` — 1 files (sample: LWB201_OPEN.png)
- `_Polar_Camel_Complete_Collection/40oz Water Bottles/BLANK` — 1 files (sample: LWB301_BLANK.png)
- `_Polar_Camel_Complete_Collection/40oz Water Bottles/BLANK_LUGLID` — 1 files (sample: LWB301_LUGLID_BLANK.png)
- `_Polar_Camel_Complete_Collection/40oz Water Bottles/BLANK_OPEN` — 1 files (sample: LWB301_OPEN_BLANK.png)
- `_Polar_Camel_Complete_Collection/40oz Water Bottles/DECORATED` — 1 files (sample: LWB301.png)
- `_Polar_Camel_Complete_Collection/40oz Water Bottles/DECORATED_LUGLID` — 1 files (sample: LWB301_LUGLID.png)
- `_Polar_Camel_Complete_Collection/40oz Water Bottles/DECORATED_OPEN` — 1 files (sample: LWB301_OPEN.png)
- `_Polar_Camel_Complete_Collection/40oz. Tumbler` — 5 files (sample: 40ozTumblerLid_OPEN.png, 40ozTumblerLid.png, 40ozTumblerLid_OPEN2.png, 40ozStraw.png, 40ozLid_Straw.png)
- `_Polar_Camel_Complete_Collection/Growlers/Decorated` — 2 files (sample: LGR642.png, LGR641.png)
- `_Polar_Camel_Complete_Collection/Growlers/Undecorated` — 2 files (sample: LGR642_BLANK.png, LGR641_BLANK.png)
- `_Polar_Camel_Complete_Collection/ION Plated Tumblers/Ghost_Black` — 8 files (sample: LTM7279_BLANK.png, LTMSET12_BLANK.png, LTM7279.png, LTM7278.png, LTM7278_BLANK.png...)
- `_Polar_Camel_Complete_Collection/ION Plated Tumblers/Gold` — 12 files (sample: LTM7230_BLANK.png, LTM7231.png, LTM7230.png, LTM7232.png, LTM7233.png...)
- `_Polar_Camel_Complete_Collection/ION Plated Tumblers/Pastel_BlackGhost Tumblers` — 4 files (sample: LTMSET10.png, LTMSET9.png, LTMSET9_BLANK.png, LTMSET10_BLANK.png)
- `_Polar_Camel_Complete_Collection/ION Plated Tumblers/Prism` — 4 files (sample: LTMSET15_BLANK.png, LTMSET16_BLANK.png, LTMSET16.png, LTMSET15.png)
- `_Polar_Camel_Complete_Collection/ION Plated Tumblers/Rose_Gold` — 4 files (sample: LTMSET14_BLANK.png, LTMSET13_BLANK.png, LTMSET13.png, LTMSET14.png)
- `_Polar_Camel_Complete_Collection/Leatherette Tumblers/20 oz Black Leatherette Tumblers/BLANK` — 1 files (sample: LTM5250SET_BLANK.png)
- `_Polar_Camel_Complete_Collection/Leatherette Tumblers/20 oz Black Leatherette Tumblers/DECORATED` — 1 files (sample: LTM5250SET.png)
- `_Polar_Camel_Complete_Collection/Leatherette Tumblers/40 oz Black Leatherette Tumblers/BLANK` — 1 files (sample: LTM7450SET_BLANK.png)
- `_Polar_Camel_Complete_Collection/Leatherette Tumblers/40 oz Black Leatherette Tumblers/DECORATED` — 1 files (sample: LTM7450SET.png)
- `_Polar_Camel_Complete_Collection/Logo` — 1 files (sample: Polar-Camel.png)
- `_Polar_Camel_Complete_Collection/Pet Bowls/Large 64 oz. Pet Bowl` — 2 files (sample: LPB_64OZ_INSIDE.png, LPB044_BOTTOM.png)
- `_Polar_Camel_Complete_Collection/Pet Bowls/Large 64 oz. Pet Bowl/Blank` — 6 files (sample: LPB045_BLANK.png, LPB043_BLANK.png, LPB044_BLANK.png, LPB042_BLANK.png, LPB041_BLANK.png...)
- `_Polar_Camel_Complete_Collection/Pet Bowls/Large 64 oz. Pet Bowl/Decorated` — 6 files (sample: LPB045.png, LPB044.png, LPB046.png, LPB043.png, LPB042.png...)
- `_Polar_Camel_Complete_Collection/Pet Bowls/Medium 32 oz. Pet Bowl` — 2 files (sample: LPB_32OZ_INSIDE.png, LPB024_BOTTOM.png)
- `_Polar_Camel_Complete_Collection/Pet Bowls/Medium 32 oz. Pet Bowl/BLANK` — 6 files (sample: LPB026_BLANK.png, LPB021_BLANK.png, LPB024_BLANK.png, LPB022_BLANK.png, LPB025_BLANK.png...)
- `_Polar_Camel_Complete_Collection/Pet Bowls/Medium 32 oz. Pet Bowl/DECORATED` — 6 files (sample: LPB026.png, LPB025.png, LPB024.png, LPB021.png, LPB023.png...)
- `_Polar_Camel_Complete_Collection/Pet Bowls/Small 18 oz. Pet Bowl` — 6 files (sample: LPB003_BOTTOM.png, LPB001_BOTTOM.png, LPB004_BOTTOM.png, LPB002_BOTTOM.png, LPB005_BOTTOM.png...)
- `_Polar_Camel_Complete_Collection/Pet Bowls/Small 18 oz. Pet Bowl/BLANK` — 6 files (sample: LPB001_BLANK.png, LPB006_BLANK.png, LPB005_BLANK.png, LPB003_BLANK.png, LPB004_BLANK.png...)
- `_Polar_Camel_Complete_Collection/Pet Bowls/Small 18 oz. Pet Bowl/DECORATED` — 6 files (sample: LPB006.png, LPB004.png, LPB005.png, LPB001.png, LPB002.png...)
- `_Polar_Camel_Complete_Collection/Polar Camel Accessories` — 11 files (sample: LWBL2.png, LTM30SNA_OPEN.png, LTM30SNA_Straw.png, PCSTRAW1.png, LTM30SNA_OPEN2.png...)
- `_Polar_Camel_Complete_Collection/Polar Camel Accessories/Silicone Straws` — 19 files (sample: SST233.png, SST232.png, SST231_END.png, SST230.png, SST231.png...)
- `_Polar_Camel_Complete_Collection/Polar Camel Sets` — 69 files (sample: LCMSET4_BLANK.png, LBHSET5.png, LWB40SET2_BLANK.png, LSC100SET.png, LTMSET14_BLANK.png...)
- `_Polar_Camel_Complete_Collection/Polar Camel Stickers` — 3 files (sample: PCS02.png, PCS03.png, PCS01.png)
- `_Polar_Camel_Complete_Collection/Polar_Camel_Display` — 3 files (sample: PPDISPLAY1_STYLED.png, PPDISPLAY1_STYLED2.png, PPDISPLAY2_STYLED.png)
- `_Polar_Camel_Complete_Collection/Polar_Camel_GlassandDecanter_Sets/BLANK` — 12 files (sample: DG401_SINGLE_BLANK.png, DCS351_BLANK.png, DCS301_BLANK.png, DG301_BLANK.png, DC401_BLANK.png...)
- `_Polar_Camel_Complete_Collection/Polar_Camel_GlassandDecanter_Sets/DECORATED` — 41 files (sample: DCS351_BOX.png, DG301_WBOX.png, DC401_BOXOPEN.png, DCS301.png, DC351.png...)
- `_Polar_Camel_Complete_Collection/Polar_Camel_Glassware/BLANK` — 2 files (sample: PCG119_BLANK.png, PCG215_BLANK.png)
- `_Polar_Camel_Complete_Collection/Polar_Camel_Glassware/DECORATED` — 3 files (sample: PCG215.png, PCG119.png, PCG215_STYLED.png)
- `_Polar_Camel_Complete_Collection/Serving_Bowls/BLANK` — 24 files (sample: LSB301_OPEN_BLANK.png, LSB202_BLANK.png, LSB202_OPEN_BLANK.png, LSB204_OPEN_BLANK.png, LSB204_BLANK.png...)
- `_Polar_Camel_Complete_Collection/Serving_Bowls/BOTTOM_LID` — 10 files (sample: LSBLID2.png, LSB202_BOTTOM.png, LSBLID1.png, LSB302_BOTTOM.png, LSB303_BOTTOM.png...)
- `_Polar_Camel_Complete_Collection/Serving_Bowls/DECORATED` — 32 files (sample: LSB201_LIDSIDE.png, LSB204_LIDSIDE.png, LSB302_DISC.png, LSB303_DISC.png, LSB204_OPEN.png...)
- `_Polar_Camel_Complete_Collection/Silicone Bottle Boots/20 oz. Boots/BLANK` — 7 files (sample: WBB052_BLANK.png, WBB004_BLANK.png, WBB002_BLANK.png, WBB053_BLANK.png, WBB003_BLANK.png...)
- `_Polar_Camel_Complete_Collection/Silicone Bottle Boots/20 oz. Boots/DECORATED` — 7 files (sample: WBB052.png, WBB053.png, WBB051.png, WBB002.png, WBB003.png...)
- `_Polar_Camel_Complete_Collection/Silicone Bottle Boots/32 oz. Boots/BLANK` — 7 files (sample: WBB101_BLANK.png, WBB151_BLANK.png, WBB102_BLANK.png, WBB104_BLANK.png, WBB152_BLANK.png...)
- `_Polar_Camel_Complete_Collection/Silicone Bottle Boots/32 oz. Boots/DECORATED` — 7 files (sample: WBB151.png, WBB152.png, WBB153.png, WBB101.png, WBB102.png...)
- `_Polar_Camel_Complete_Collection/Silicone Bottle Boots/40 oz. Boots/BLANK` — 7 files (sample: WBB251_BLANK.png, WBB201_BLANK.png, WBB253_BLANK.png, WBB203_BLANK.png, WBB252_BLANK.png...)
- `_Polar_Camel_Complete_Collection/Silicone Bottle Boots/40 oz. Boots/DECORATED` — 7 files (sample: WBB251.png, WBB253.png, WBB252.png, WBB201.png, WBB203.png...)
- `_Polar_Camel_Complete_Collection/Sippy_Cups/LID_HANDLE` — 5 files (sample: LSCLID1.png, LSCLID1_LidExample.png, LSCLID1_LidExample2.png, LSCLID1_SIDE.png, LSCHNDL1.png)
- `_Polar_Camel_Complete_Collection/Sublimatable Mug & Tumblers/Decorated` — 35 files (sample: STM622.png, SWB920_OPEN.png, SWB921_OPEN.png, STM621.png, STM631.png...)
- `_Polar_Camel_Complete_Collection/Sublimatable Mug & Tumblers/Undecorated` — 32 files (sample: STM642_BLANK.png, SWB930_BLANK.png, SCM201_BLANK.png, STM621_BLANK.png, SBH13_BLANK.png...)
- `_Polar_Camel_Complete_Collection/Wine_Chillers/BLANK` — 16 files (sample: LWC104_BOTTLE_BLANK.png, LWC103_BLANK.png, LWC101_OPEN_BLANK.png, LWC104_OPEN_BOTTLE_BLANK.png, LWC102_OPEN_BLANK.png...)
- `_Polar_Camel_Complete_Collection/Wine_Chillers/DECORATED` — 23 files (sample: LWC101_OPEN_BOTTLE.png, LWCLIDONLY.png, LWC102_HANDLID.png, LWC101_OPEN_BOTTLE_DP.png, LWC102_BOTTLE.png...)

## Sample matched SKUs (first 50, ordered)

| SKU | # | First | Last |
|-----|---|-------|------|
| `ADW10BK` | 2 | `adw10bk.jpg` | `ADW10BK.jpg` |
| `ADW10CL` | 2 | `adw10cl.jpg` | `ADW10CL.jpg` |
| `ADW8BK` | 1 | `adw8bk.jpg` | `-` |
| `ADW8CL` | 2 | `ADW8CL.png` | `adw8cl.jpg` |
| `BPN101` | 6 | `BPN101.png` | `BPN101_OPEN_BLANK.png` |
| `BPN102` | 7 | `BPN102.png` | `BPN102_OPEN_BLANK.png` |
| `BPN103` | 6 | `BPN103.png` | `BPN103_OPEN_BLANK.png` |
| `BPN104` | 6 | `BPN104.png` | `BPN104_OPEN_BLANK.png` |
| `BPN105` | 6 | `BPN105.png` | `BPN105_OPEN_BLANK.png` |
| `BR1001` | 6 | `BR1001.png` | `BR1001_TOP.png` |
| `BR1002` | 6 | `BR1002.png` | `BR1002_TOP.png` |
| `BR1003` | 6 | `BR1003.png` | `BR1003_TOPANGLE.png` |
| `BR1004` | 5 | `BR1004.png` | `BR1004_TOP.png` |
| `BR1251` | 7 | `BR1251.png` | `BR1251_OPEN_SIDE2.png` |
| `BR1252` | 5 | `BR1252.png` | `BR1252_TOP.png` |
| `BR1253` | 6 | `BR1253.png` | `BR1253_SIDE2_OPEN.png` |
| `BR1501` | 6 | `BR1501.png` | `BR1501_TOP.png` |
| `BR1502` | 7 | `BR1502.png` | `BR1502_TOP.png` |
| `BR1751` | 9 | `BR1751.png` | `BR1751_TOP.png` |
| `BR1752` | 8 | `BR1752.png` | `BR1752_TOP.png` |
| `BR1753` | 5 | `BR1753.png` | `BR1753_SIDE2.png` |
| `BR2001` | 7 | `BR2001.png` | `BR2001_SIDE2.png` |
| `BR2251` | 5 | `BR2251.png` | `BR2251_STYLED.png` |
| `BR2252` | 2 | `BR2252.png` | `BR2252_BACK.png` |
| `BR2253` | 2 | `BR2253.png` | `BR2253_BACK.png` |
| `BR2501` | 8 | `BR2501.png` | `BR2501_SIDE.png` |
| `CH103` | 5 | `CH103.png` | `CH103_OPEN_BLANK.png` |
| `CH104` | 5 | `CH104.png` | `CH104_OPEN_BLANK.png` |
| `CH105` | 5 | `CH105.png` | `CH105_OPEN_BLANK.png` |
| `CH109` | 5 | `CH109.png` | `CH109_OPEN_BLANK.png` |
| `CH110` | 5 | `CH110.png` | `CH110_OPEN_BLANK.png` |
| `CH111` | 5 | `CH111.png` | `CH111_OPEN_BLANK.png` |
| `CH113` | 6 | `CH113.png` | `CH113_OPEN_BLANK.png` |
| `DS10` | 1 | `DS10_BLANK.png` | `-` |
| `DS12` | 2 | `DS12.png` | `DS12_BLANK.png` |
| `DS20` | 1 | `DS20_BLANK.png` | `-` |
| `DS8` | 2 | `DS8.png` | `DS8_BLANK.png` |
| `FNL01` | 1 | `FNL01.jpg` | `-` |
| `FSK01` | 4 | `FSK01.jpg` | `FSK01_OPEN_BLANK.png` |
| `FSK101` | 3 | `FSK101.png` | `FSK101_BLANK.png` |
| `FSK102` | 3 | `FSK102.png` | `FSK102_BLANK.png` |
| `FSK103` | 3 | `FSK103.png` | `FSK103_BLANK.png` |
| `FSK104` | 3 | `FSK104.png` | `FSK104_BLANK.png` |
| `FSK111` | 3 | `FSK111.png` | `FSK111_BLANK.png` |
| `FSK12` | 3 | `FSK12.png` | `FSK12_BLANK.png` |
| `FSK302` | 5 | `FSK302.png` | `FSK302_OPEN_BLANK.png` |
| `FSK303` | 5 | `FSK303.png` | `FSK303_OPEN_BLANK.png` |
| `FSK304` | 5 | `FSK304.png` | `FSK304_OPEN_BLANK.png` |
| `FSK305` | 5 | `FSK305.png` | `FSK305_OPEN_BLANK.png` |
| `FSK308` | 5 | `FSK308.png` | `FSK308_OPEN_BLANK.png` |


## Duplicate basenames within a SKU (1557)

Multiple source files with identical filenames were found for the same SKU; only the highest-ordered one was kept. The dropped variants were almost certainly identical (same file copied into multiple supplier categories).

| SKU | Kept path | Dropped path |
|---|---|---|
| `LTM975` | `Drinkware/20oz Pilsner Tumblers/DECORATED/LTM975.png` | `_Polar_Camel_Complete_Collection/20oz Pilsner Tumblers/DECORATED/LTM975.png` |
| `LTM975` | `Drinkware/20oz Pilsner Tumblers/Undecorated/LTM975_BLANK.png` | `_Polar_Camel_Complete_Collection/20oz Pilsner Tumblers/Undecorated/LTM975_BLANK.png` |
| `FSK661SETA` | `All_Product_Images/large/FSK661SETA.jpg` | `Drinkware/Flasks_FlaskSets/FSK661SETA.jpg` |
| `LWB213` | `All_Product_Images/large/LWB213.png` | `Drinkware/32 oz. Water Bottles/DECORATED/LWB213.png` |
| `LWB213` | `All_Product_Images/large/LWB213.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/DECORATED/LWB213.png` |
| `LWB213` | `Drinkware/32 oz. Water Bottles/DECORATED_LUGLID/LWB213_LUGLID.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/DECORATED_LUGLID/LWB213_LUGLID.png` |
| `LWB213` | `Drinkware/32 oz. Water Bottles/DECORATED_OPEN/LWB213_OPEN.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/DECORATED_OPEN/LWB213_OPEN.png` |
| `LWB213` | `Drinkware/32 oz. Water Bottles/BLANK/LWB213_BLANK.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/BLANK/LWB213_BLANK.png` |
| `LWB213` | `Drinkware/32 oz. Water Bottles/BLANK_LUGLID/LWB213_LUGLID_BLANK.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/BLANK_LUGLID/LWB213_LUGLID_BLANK.png` |
| `LWB213` | `Drinkware/32 oz. Water Bottles/BLANK_OPEN/LWB213_OPEN_BLANK.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/BLANK_OPEN/LWB213_OPEN_BLANK.png` |
| `LTM949` | `Drinkware/14oz Pilsner Tumblers/DECORATED/LTM949.png` | `_Polar_Camel_Complete_Collection/14oz Pilsner Tumblers/DECORATED/LTM949.png` |
| `LTM949` | `Drinkware/14oz Pilsner Tumblers/Undecorated/LTM949_BLANK.png` | `_Polar_Camel_Complete_Collection/14oz Pilsner Tumblers/Undecorated/LTM949_BLANK.png` |
| `LWB207` | `All_Product_Images/large/LWB207.png` | `Drinkware/32 oz. Water Bottles/DECORATED/LWB207.png` |
| `LWB207` | `All_Product_Images/large/LWB207.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/DECORATED/LWB207.png` |
| `LWB207` | `Drinkware/32 oz. Water Bottles/DECORATED_LUGLID/LWB207_LUGLID.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/DECORATED_LUGLID/LWB207_LUGLID.png` |
| `LWB207` | `Drinkware/32 oz. Water Bottles/DECORATED_OPEN/LWB207_OPEN.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/DECORATED_OPEN/LWB207_OPEN.png` |
| `LWB207` | `Drinkware/32 oz. Water Bottles/BLANK/LWB207_BLANK.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/BLANK/LWB207_BLANK.png` |
| `LWB207` | `Drinkware/32 oz. Water Bottles/BLANK_LUGLID/LWB207_LUGLID_BLANK.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/BLANK_LUGLID/LWB207_LUGLID_BLANK.png` |
| `LWB207` | `Drinkware/32 oz. Water Bottles/BLANK_OPEN/LWB207_OPEN_BLANK.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/BLANK_OPEN/LWB207_OPEN_BLANK.png` |
| `GFT2241` | `All_Product_Images/large/GFT2241.png` | `Gifts_and_Engravables/All_Leatherette/LL_Journal_SketchBook/GFT2241.png` |
| `GFT2269` | `All_Product_Images/large/GFT2269.png` | `Gifts_and_Engravables/All_Leatherette/LL_Journal_SketchBook/GFT2269.png` |
| `LTM752` | `Drinkware/16oz Pints/Decorated/LTM752.png` | `_Polar_Camel_Complete_Collection/16oz Pints/Decorated/LTM752.png` |
| `LTM752` | `Drinkware/16oz Pints/Undecorated/LTM752_BLANK.png` | `_Polar_Camel_Complete_Collection/16oz Pints/Undecorated/LTM752_BLANK.png` |
| `LTM5208` | `Drinkware/Leatherette Tumblers/20 oz SS Leatherette Tumblers/Decorated/LTM5208.png` | `_Polar_Camel_Complete_Collection/Leatherette Tumblers/20 oz SS Leatherette Tumblers/Decorated/LTM5208.png` |
| `LTM5208` | `Drinkware/Leatherette Tumblers/20 oz SS Leatherette Tumblers/Undecorated/LTM5208_BLANK.png` | `_Polar_Camel_Complete_Collection/Leatherette Tumblers/20 oz SS Leatherette Tumblers/Undecorated/LTM5208_BLANK.png` |
| `LTM20L` | `Drinkware/Polar Camel Accessories/LTM20L.png` | `_Polar_Camel_Complete_Collection/Polar Camel Accessories/LTM20L.png` |
| `GFT1210` | `All_Product_Images/large/GFT1210.png` | `Gifts_and_Engravables/All_Leatherette/LL_Portfolios/GFT1210.png` |
| `PTF446` | `All_Product_Images/large/PTF446.jpg` | `Plaques_and_Accessories/PTF446.jpg` |
| `GFT220` | `All_Product_Images/large/GFT220.jpg` | `Gifts_and_Engravables/Cutting_Boards/GFT220.jpg` |
| `GFT2137` | `All_Product_Images/large/GFT2137.png` | `Gifts_and_Engravables/All_Leatherette/LL_Wallets_MoneyClips/GFT2137.png` |
| `LTM815` | `Drinkware/16oz Stemless Wine Glasses/Decorated/LTM815.png` | `_Polar_Camel_Complete_Collection/16oz Stemless Wine Glasses/Decorated/LTM815.png` |
| `LTM815` | `Drinkware/16oz Stemless Wine Glasses/Undecorated/LTM815_BLANK.png` | `_Polar_Camel_Complete_Collection/16oz Stemless Wine Glasses/Undecorated/LTM815_BLANK.png` |
| `GFT2321` | `All_Product_Images/large/GFT2321.png` | `Gifts_and_Engravables/Cutting_Boards/GFT2321.png` |
| `GFT2308` | `All_Product_Images/large/GFT2308.png` | `Gifts_and_Engravables/All_Leatherette/LL_JewelryBoxes/GFT2308.png` |
| `GFT2320` | `All_Product_Images/large/GFT2320.png` | `Gifts_and_Engravables/Cutting_Boards/GFT2320.png` |
| `LTM814` | `Drinkware/16oz Stemless Wine Glasses/Decorated/LTM814.png` | `_Polar_Camel_Complete_Collection/16oz Stemless Wine Glasses/Decorated/LTM814.png` |
| `LTM814` | `Drinkware/16oz Stemless Wine Glasses/Undecorated/LTM814_BLANK.png` | `_Polar_Camel_Complete_Collection/16oz Stemless Wine Glasses/Undecorated/LTM814_BLANK.png` |
| `GFT2136` | `All_Product_Images/large/GFT2136.png` | `Gifts_and_Engravables/All_Leatherette/LL_Wallets_MoneyClips/GFT2136.png` |
| `GFT221` | `All_Product_Images/large/GFT221.jpg` | `Gifts_and_Engravables/Cutting_Boards/GFT221.jpg` |
| `LWB205` | `Drinkware/32 oz. Water Bottles/DECORATED/LWB205.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/DECORATED/LWB205.png` |
| `LWB205` | `Drinkware/32 oz. Water Bottles/DECORATED_LUGLID/LWB205_LUGLID.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/DECORATED_LUGLID/LWB205_LUGLID.png` |
| `LWB205` | `Drinkware/32 oz. Water Bottles/DECORATED_OPEN/LWB205_OPEN.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/DECORATED_OPEN/LWB205_OPEN.png` |
| `LWB205` | `Drinkware/32 oz. Water Bottles/BLANK/LWB205_BLANK.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/BLANK/LWB205_BLANK.png` |
| `LWB205` | `Drinkware/32 oz. Water Bottles/BLANK_LUGLID/LWB205_LUGLID_BLANK.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/BLANK_LUGLID/LWB205_LUGLID_BLANK.png` |
| `LWB205` | `Drinkware/32 oz. Water Bottles/BLANK_OPEN/LWB205_OPEN_BLANK.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/BLANK_OPEN/LWB205_OPEN_BLANK.png` |
| `LTM7218` | `Drinkware/20oz Ringneck Tumblers/Decorated/LTM7218.png` | `_Polar_Camel_Complete_Collection/20oz Ringneck Tumblers/Decorated/LTM7218.png` |
| `LTM7218` | `Drinkware/20oz Ringneck Tumblers/Undecorated/LTM7218_BLANK.png` | `_Polar_Camel_Complete_Collection/20oz Ringneck Tumblers/Undecorated/LTM7218_BLANK.png` |
| `GFT1211` | `All_Product_Images/large/GFT1211.png` | `Gifts_and_Engravables/All_Leatherette/LL_Portfolios/GFT1211.png` |
| `LWB206` | `All_Product_Images/large/LWB206.png` | `Drinkware/32 oz. Water Bottles/DECORATED/LWB206.png` |
| `LWB206` | `All_Product_Images/large/LWB206.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/DECORATED/LWB206.png` |
| `LWB206` | `Drinkware/32 oz. Water Bottles/DECORATED_LUGLID/LWB206_LUGLID.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/DECORATED_LUGLID/LWB206_LUGLID.png` |
| `LWB206` | `Drinkware/32 oz. Water Bottles/DECORATED_OPEN/LWB206_OPEN.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/DECORATED_OPEN/LWB206_OPEN.png` |
| `LWB206` | `Drinkware/32 oz. Water Bottles/BLANK/LWB206_BLANK.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/BLANK/LWB206_BLANK.png` |
| `LWB206` | `Drinkware/32 oz. Water Bottles/BLANK_LUGLID/LWB206_LUGLID_BLANK.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/BLANK_LUGLID/LWB206_LUGLID_BLANK.png` |
| `LWB206` | `Drinkware/32 oz. Water Bottles/BLANK_OPEN/LWB206_OPEN_BLANK.png` | `_Polar_Camel_Complete_Collection/32 oz. Water Bottles/BLANK_OPEN/LWB206_OPEN_BLANK.png` |
| `LTM753` | `All_Product_Images/large/LTM753.png` | `Drinkware/16oz Pints/Decorated/LTM753.png` |
| `LTM753` | `All_Product_Images/large/LTM753.png` | `_Polar_Camel_Complete_Collection/16oz Pints/Decorated/LTM753.png` |
| `LTM753` | `Drinkware/16oz Pints/Undecorated/LTM753_BLANK.png` | `_Polar_Camel_Complete_Collection/16oz Pints/Undecorated/LTM753_BLANK.png` |
| `GFT2081` | `All_Product_Images/large/GFT2081.png` | `Drinkware/Coasters/GFT2081.png` |
| `LTM5209` | `Drinkware/Leatherette Tumblers/20 oz SS Leatherette Tumblers/Decorated/LTM5209.png` | `_Polar_Camel_Complete_Collection/Leatherette Tumblers/20 oz SS Leatherette Tumblers/Decorated/LTM5209.png` |
| ... | ... | (+1497 more) |

_Full manifest: `.scrape/overnight/matches.json`_
_Catalog sidecar: `src/data/product-images.json`_